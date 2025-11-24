import { Card } from "@/components/ui/card";
import soilImage from "@/assets/soil-growth.jpg";
import weatherImage from "@/assets/weather-farm.jpg";

const Benefits = () => {
  return (
    <section id="benefits" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Farmers
            <span className="text-primary"> Trust Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of farmers who have transformed their agricultural practices with our AI platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover:shadow-xl transition-shadow">
            <img 
              src={soilImage} 
              alt="Soil and growth" 
              className="rounded-lg mb-6 w-full h-64 object-cover"
            />
            <h3 className="text-2xl font-bold text-foreground mb-4">Increase Your Yield</h3>
            <p className="text-muted-foreground text-lg mb-4">
              Our recommendations have helped farmers increase their crop yields by an average of 35% through optimized crop selection and timing.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-foreground">Better resource utilization</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-foreground">Reduced crop failure rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-foreground">Improved soil health over time</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow">
            <img 
              src={weatherImage} 
              alt="Weather monitoring" 
              className="rounded-lg mb-6 w-full h-64 object-cover"
            />
            <h3 className="text-2xl font-bold text-foreground mb-4">Reduce Risks</h3>
            <p className="text-muted-foreground text-lg mb-4">
              Make data-driven decisions that minimize agricultural risks and protect your investment throughout the growing season.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-foreground">Weather-based risk assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-foreground">Early pest and disease warnings</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 font-bold">•</span>
                <span className="text-foreground">Market volatility protection</span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Save Time and Money
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Automated analysis and recommendations save you countless hours of research and reduce costly mistakes. Focus on what matters most - growing your crops.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">40%</div>
              <div className="text-foreground font-medium">Time Saved on Planning</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">30%</div>
              <div className="text-foreground font-medium">Cost Reduction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-foreground font-medium">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
