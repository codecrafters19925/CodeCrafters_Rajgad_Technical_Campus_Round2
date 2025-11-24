import { Card } from "@/components/ui/card";
import { Brain, Cloud, Leaf, TrendingUp, MapPin, Calendar } from "lucide-react";
import aiCropsImage from "@/assets/ai-crops.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze multiple factors to recommend the best crops for your land."
  },
  {
    icon: Cloud,
    title: "Weather Integration",
    description: "Real-time weather data and forecasts help predict optimal planting and harvesting times."
  },
  {
    icon: Leaf,
    title: "Soil Health Monitoring",
    description: "Comprehensive soil analysis ensures you plant crops that thrive in your specific conditions."
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Stay ahead with market trends and price predictions to maximize your profits."
  },
  {
    icon: MapPin,
    title: "Location-Based Data",
    description: "Recommendations tailored to your specific geographic location and climate zone."
  },
  {
    icon: Calendar,
    title: "Seasonal Planning",
    description: "Year-round guidance for crop rotation and seasonal planting strategies."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features for
            <span className="text-primary"> Smart Farming</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed decisions about crop selection and farm management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={aiCropsImage} 
              alt="AI analyzing crops" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Advanced Technology Meets Agriculture
            </h3>
            <p className="text-lg text-muted-foreground">
              Our platform combines cutting-edge artificial intelligence with decades of agricultural expertise to provide you with actionable insights.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Real-time data processing and analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Historical data comparison and trends</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span className="text-foreground">Mobile-friendly dashboard access</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
