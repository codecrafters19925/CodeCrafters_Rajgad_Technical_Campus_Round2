import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, Sprout, Camera, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WeatherSummary {
  historical: {
    avgTempMax: string;
    avgTempMin: string;
    totalRainfall: string;
  };
  forecast: {
    avgTempMax: string;
    totalRainfall: string;
  };
}

interface CropSuggestion {
  crop_name: string;
  yield_per_acre: string;
  irrigation_schedule: string;
  growing_info: string;
  reasoning: string;
}

interface SuggestionResult {
  location: string;
  weatherSummary: WeatherSummary;
  suggestion: CropSuggestion;
}

const CropSuggestion = () => {
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [result, setResult] = useState<SuggestionResult | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const getCurrentLocation = () => {
    setGettingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const lon = position.coords.longitude.toFixed(4);
          setLatitude(lat);
          setLongitude(lon);
          
          // Reverse geocode to get location name
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
            );
            const data = await response.json();
            const locationName = 
              data.address?.city || 
              data.address?.town || 
              data.address?.village || 
              data.address?.county || 
              data.address?.state_district ||
              "Unknown Location";
            setLocationName(locationName);
            toast.success(`Location detected: ${locationName} (${lat}, ${lon})`);
          } catch (error) {
            console.error("Geocoding error:", error);
            const fallbackName = `Location (${lat}, ${lon})`;
            setLocationName(fallbackName);
            toast.success(`Coordinates detected: ${lat}, ${lon}`);
          }
          
          setGettingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage = "Could not get your location. ";
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Please allow location access in your browser.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out.";
              break;
            default:
              errorMessage += "Please enter location manually.";
          }
          
          toast.error(errorMessage);
          setGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
      setGettingLocation(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment", width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImages(prev => [...prev, imageData]);
        toast.success("Photo captured!");
      }
    }
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!latitude || !longitude || !locationName) {
      toast.error("Please provide all location details");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("suggest-crop", {
        body: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          locationName,
          images: capturedImages.length > 0 ? capturedImages : undefined
        },
      });

      if (error) throw error;

      if (data.success) {
        setResult(data);
        toast.success("Crop suggestion generated!");
        stopCamera();
      } else {
        throw new Error(data.error || "Failed to generate suggestion");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get crop suggestion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Crop Suggestion
            </h1>
            <p className="text-lg text-muted-foreground">
              Get personalized crop recommendations based on your location's weather patterns
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Location Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </CardTitle>
                  <CardDescription>
                    Enter location or use GPS
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    disabled={gettingLocation}
                    className="w-full"
                  >
                    {gettingLocation ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Location...
                      </>
                    ) : (
                      <>
                        <MapPin className="mr-2 h-4 w-4" />
                        Use Current Location
                      </>
                    )}
                  </Button>
                  <div className="space-y-2">
                    <Label htmlFor="locationName">Location Name</Label>
                    <Input
                      id="locationName"
                      placeholder="e.g., Mumbai, India"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="0.0001"
                        placeholder="19.0760"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="0.0001"
                        placeholder="72.8777"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Camera Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Land Photos
                  </CardTitle>
                  <CardDescription>
                    Capture photos for AI soil and land analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isCameraActive ? (
                    <Button
                      type="button"
                      onClick={startCamera}
                      variant="outline"
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Open Camera
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative rounded-lg overflow-hidden bg-muted">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={capturePhoto}
                          className="flex-1"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Capture
                        </Button>
                        <Button
                          type="button"
                          onClick={stopCamera}
                          variant="outline"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {capturedImages.length > 0 && (
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Captured Photos ({capturedImages.length})
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {capturedImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Land photo ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(idx)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Weather & Land...
                </>
              ) : (
                <>
                  <Sprout className="mr-2 h-5 w-5" />
                  Get AI Crop Suggestion
                </>
              )}
            </Button>
          </form>

          {result && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weather Summary for {result.location}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold mb-2">Past 30 Days</h4>
                      <div className="space-y-1 text-sm">
                        <p>Avg Max Temp: <span className="font-medium">{result.weatherSummary.historical.avgTempMax}°C</span></p>
                        <p>Avg Min Temp: <span className="font-medium">{result.weatherSummary.historical.avgTempMin}°C</span></p>
                        <p>Total Rainfall: <span className="font-medium">{result.weatherSummary.historical.totalRainfall}mm</span></p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Next 16 Days Forecast</h4>
                      <div className="space-y-1 text-sm">
                        <p>Expected Avg Max Temp: <span className="font-medium">{result.weatherSummary.forecast.avgTempMax}°C</span></p>
                        <p>Expected Rainfall: <span className="font-medium">{result.weatherSummary.forecast.totalRainfall}mm</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sprout className="h-6 w-6 text-primary" />
                    Recommended Crop: {result.suggestion.crop_name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Expected Yield</h4>
                    <p className="text-muted-foreground">{result.suggestion.yield_per_acre}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Irrigation Schedule</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{result.suggestion.irrigation_schedule}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Growing Information</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{result.suggestion.growing_info}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Why This Crop?</h4>
                    <p className="text-muted-foreground whitespace-pre-line">{result.suggestion.reasoning}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CropSuggestion;
