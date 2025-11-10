import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "🥄 GHEE", category: "Ghee", type: "category" },
  { name: "🌾 ATTA", category: "Grains", type: "category" },
  { name: "🌿 OIL", category: "Oils", type: "category" },
  { name: "🍚 RICE", category: "Rice", type: "category" },
  { name: "SHOP BY CATEGORY", href: "#products", type: "scroll" },
  { name: "JOIN COLLECTIVE", href: "#collective", type: "scroll", highlight: true },
  { name: "SHOP BY CONCERN", href: "#concerns", type: "scroll" },
  { name: "CURATED PICKS", href: "/curated-picks", type: "link" },
  { name: "FARM LIFE", href: "/farm-life", type: "link" },
  { name: "TRACK ORDER", href: "/track-order", type: "link" },
];

export const Navigation = () => {
  const navigate = useNavigate();

  const handleClick = (item: typeof categories[0]) => {
    if (item.type === "category") {
      navigate(`/?category=${item.category}#products`);
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (item.type === "scroll") {
      const target = item.href?.replace("#", "");
      document.getElementById(target || "")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-background border-b border-border sticky top-[72px] z-40 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-1 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((item) => {
            if (item.type === "link") {
              return (
                <Link key={item.name} to={item.href || "#"}>
                  <Button
                    variant={item.highlight ? "default" : "ghost"}
                    size="sm"
                    className={
                      item.highlight
                        ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 whitespace-nowrap"
                        : "hover:bg-accent whitespace-nowrap"
                    }
                  >
                    {item.name}
                  </Button>
                </Link>
              );
            }

            return (
              <Button
                key={item.name}
                variant={item.highlight ? "default" : "ghost"}
                size="sm"
                onClick={() => handleClick(item)}
                className={
                  item.highlight
                    ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 whitespace-nowrap"
                    : "hover:bg-accent whitespace-nowrap"
                }
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
