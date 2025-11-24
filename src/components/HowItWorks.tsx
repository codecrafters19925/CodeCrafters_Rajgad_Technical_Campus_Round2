import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, Brain, Sprout } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "Enter Your Location",
    description: "Provide your farm's location and basic land details to get started with personalized recommendations."
  },
  {
    icon: FileText,
    number: "02",
    title: "Share Farm Data",
    description: "Input information about your soil type, available resources, and previous crop history."
  },
  {
    icon: Brain,
    number: "03",
    title: "AI Analysis",
    description: "Our AI processes your data along with weather patterns, market trends, and regional insights."
  },
  {
    icon: Sprout,
    number: "04",
    title: "Get Recommendations",
    description: "Receive detailed crop recommendations with planting schedules and expected outcomes."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How
            <span className="text-primary"> It Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple four-step process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                {step.number}
              </div>
              <step.icon className="w-12 h-12 text-primary mb-4 mt-2" />
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers already using AI to maximize their harvest
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg shadow-lg hover:shadow-xl">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white text-primary border-white hover:bg-white/90">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
