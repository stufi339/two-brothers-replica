import { Shield, Truck, Award, Lock } from "lucide-react";

const indicators = [
  {
    icon: Shield,
    title: "100% Organic",
    description: "Certified organic products",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹999",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Farm-fresh promise",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Safe & encrypted",
  },
];

export const TrustIndicators = () => {
  return (
    <section className="py-12 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {indicators.map((indicator) => (
            <div
              key={indicator.title}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <indicator.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                {indicator.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
