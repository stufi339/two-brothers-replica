import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CollectiveDialog } from "@/components/CollectiveDialog";
import mascotImage from "@/assets/mascot.png";

export const HeroSection = () => {
  const [isCollectiveOpen, setIsCollectiveOpen] = useState(false);

  return (
    <section className="bg-gradient-to-br from-warm-sand via-muted to-accent py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Mascot */}
          <div className="flex justify-center">
            <img
              src={mascotImage}
              alt="Organic Farms Mascot"
              className="w-full max-w-md animate-in fade-in slide-in-from-left duration-700"
            />
          </div>

          {/* Right - CTA */}
          <div className="text-center md:text-left space-y-6 animate-in fade-in slide-in-from-right duration-700">
            <h2 className="text-4xl md:text-6xl font-bold text-secondary">
              LOVE DISCOUNTS?
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-primary">
              GET A PERMANENT 12% OFF WITH
            </p>
            <div className="inline-block">
              <div className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold text-2xl md:text-3xl">
                TWO BROTHERS
                <span className="block text-base">ORGANIC FARMS</span>
              </div>
              <Badge 
                className="bg-secondary text-secondary-foreground text-xl px-6 py-2 mt-4 block cursor-pointer hover:bg-secondary/90 transition-colors"
                onClick={() => setIsCollectiveOpen(true)}
              >
                COLLECTIVE
              </Badge>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 mt-6 w-full md:w-auto font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => setIsCollectiveOpen(true)}
            >
              SAVE ME A SPOT
            </Button>
          </div>
        </div>
      </div>
      <CollectiveDialog open={isCollectiveOpen} onOpenChange={setIsCollectiveOpen} />
    </section>
  );
};
