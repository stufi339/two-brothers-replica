import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import heroFarm from "@/assets/hero-farm.jpg";

const concerns = [
  { name: "Diabetes Care", color: "bg-leaf-green", slug: "Diabetes Care" },
  { name: "Gut Health", color: "bg-secondary", slug: "Gut Health" },
  { name: "Immunity Boost", color: "bg-primary", slug: "Immunity Boost" },
  { name: "Weight Loss", color: "bg-earth-brown", slug: "Weight Loss" },
];

export const CategorySection = () => {
  const navigate = useNavigate();

  const handleConcernClick = (concern: string) => {
    navigate(`/?concern=${encodeURIComponent(concern)}#products`);
    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="concerns" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Shop By Health Concern
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Find products tailored to your wellness journey
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {concerns.map((concern) => (
            <Card
              key={concern.name}
              onClick={() => handleConcernClick(concern.slug)}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105"
            >
              <div className={`${concern.color} h-32 flex items-center justify-center`}>
                <h3 className="text-white font-bold text-lg text-center px-4">
                  {concern.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Farm Story */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={heroFarm}
            alt="Our Organic Farm"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent flex items-end">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                From Our Farm to Your Table
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-2xl">
                Experience the purity of nature with our 100% organic, farm-fresh produce. 
                Grown with love, harvested with care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
