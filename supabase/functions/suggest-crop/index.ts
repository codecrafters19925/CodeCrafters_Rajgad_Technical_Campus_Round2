import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude, locationName, images } = await req.json();
    
    console.log("Fetching weather data for:", { latitude, longitude, locationName });

    // Get current date and calculate date ranges
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    // Fetch historical weather data (past 30 days)
    const historicalUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${formatDate(thirtyDaysAgo)}&end_date=${formatDate(today)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,windspeed_10m_max&timezone=auto`;
    
    const historicalResponse = await fetch(historicalUrl);
    const historicalData = await historicalResponse.json();

    // Fetch weather forecast (next 30 days - API provides up to 16 days, we'll use what's available)
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,windspeed_10m_max&timezone=auto&forecast_days=16`;
    
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    console.log("Weather data fetched successfully");

    // Calculate weather summary
    const historicalDaily = historicalData.daily;
    const avgTempMax = historicalDaily.temperature_2m_max.reduce((a: number, b: number) => a + b, 0) / historicalDaily.temperature_2m_max.length;
    const avgTempMin = historicalDaily.temperature_2m_min.reduce((a: number, b: number) => a + b, 0) / historicalDaily.temperature_2m_min.length;
    const totalRainfall = historicalDaily.precipitation_sum.reduce((a: number, b: number) => a + b, 0);

    const forecastDaily = forecastData.daily;
    const forecastAvgTempMax = forecastDaily.temperature_2m_max.reduce((a: number, b: number) => a + b, 0) / forecastDaily.temperature_2m_max.length;
    const forecastTotalRain = forecastDaily.precipitation_sum.reduce((a: number, b: number) => a + b, 0);

    // Prepare prompt for AI
    let prompt = `Based on the following weather data for location "${locationName}" (${latitude}, ${longitude}), suggest the best crop to plant:

HISTORICAL WEATHER (Past 30 days):
- Average Maximum Temperature: ${avgTempMax.toFixed(1)}°C
- Average Minimum Temperature: ${avgTempMin.toFixed(1)}°C
- Total Rainfall: ${totalRainfall.toFixed(1)}mm
- Daily Temperature Range: ${historicalDaily.temperature_2m_max.join(', ')}°C
- Daily Rainfall: ${historicalDaily.precipitation_sum.join(', ')}mm

FORECAST (Next 16 days):
- Expected Average Maximum Temperature: ${forecastAvgTempMax.toFixed(1)}°C
- Expected Total Rainfall: ${forecastTotalRain.toFixed(1)}mm
- Daily Temperature Forecast: ${forecastDaily.temperature_2m_max.join(', ')}°C
- Daily Rainfall Forecast: ${forecastDaily.precipitation_sum.join(', ')}mm
`;

    if (images && images.length > 0) {
      prompt += `\n\nLAND PHOTOS ANALYSIS:
I have provided ${images.length} photo(s) of the land. Please analyze:
- Soil type and condition (color, texture, moisture)
- Current vegetation or land state
- Drainage patterns visible
- Any visible issues (erosion, rocks, etc.)
- Land topography

Consider both the weather data AND the visual land analysis for your recommendation.
`;
    }

    prompt += `\nPlease analyze this data and provide:
1. The most suitable crop to plant (crop name)
2. Expected yield per acre (realistic estimate)
3. Irrigation schedule (frequency and amount)
4. Detailed growing information (planting depth, spacing, fertilizer needs, harvest time)
5. Reasoning for this recommendation based on the weather patterns${images && images.length > 0 ? ' and land photos' : ''}

Format your response as JSON with these exact keys:
{
  "crop_name": "...",
  "yield_per_acre": "...",
  "irrigation_schedule": "...",
  "growing_info": "...",
  "reasoning": "..."
}`;

    // Call Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Lovable AI for crop suggestion...");
    
    // Prepare messages with images if available
    const userContent: any[] = [{ type: "text", text: prompt }];
    
    if (images && images.length > 0) {
      for (const imageData of images) {
        userContent.push({
          type: "image_url",
          image_url: { url: imageData }
        });
      }
    }
    
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert agricultural consultant with deep knowledge of crops, climate, soil analysis, and farming practices. Provide accurate, practical advice based on weather data, land photos, and local conditions."
          },
          {
            role: "user",
            content: userContent
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const suggestion = aiData.choices[0].message.content;

    console.log("AI suggestion generated successfully");

    // Parse the JSON response from AI
    let parsedSuggestion;
    try {
      // Extract JSON from the response (AI might wrap it in markdown code blocks)
      const jsonMatch = suggestion.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedSuggestion = JSON.parse(jsonMatch[0]);
      } else {
        parsedSuggestion = JSON.parse(suggestion);
      }
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", e);
      // If parsing fails, return the raw suggestion
      parsedSuggestion = {
        crop_name: "Multiple options available",
        yield_per_acre: "Varies",
        irrigation_schedule: "Based on crop selection",
        growing_info: suggestion,
        reasoning: "Please review the detailed analysis above",
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        location: locationName,
        weatherSummary: {
          historical: {
            avgTempMax: avgTempMax.toFixed(1),
            avgTempMin: avgTempMin.toFixed(1),
            totalRainfall: totalRainfall.toFixed(1),
          },
          forecast: {
            avgTempMax: forecastAvgTempMax.toFixed(1),
            totalRainfall: forecastTotalRain.toFixed(1),
          },
        },
        suggestion: parsedSuggestion,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in suggest-crop function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
