import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "🥄 GHEE", href: "#ghee" },
  { name: "🌾 ATTA", href: "#atta" },
  { name: "OIL", href: "#oil" },
  { name: "SHOP BY CATEGORY", href: "#category" },
  { name: "JOIN COLLECTIVE", href: "#collective", highlight: true },
  { name: "SHOP BY CONCERN", href: "#concern" },
  { name: "CURATED PICKS", href: "#picks" },
  { name: "FARM LIFE", href: "#farm" },
  { name: "TRACK ORDER", href: "/track-order" },
];

export const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border sticky top-[72px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-1 py-3 overflow-x-auto">
          {categories.map((category) => {
            const isLink = category.href.startsWith('/');
            const buttonContent = (
              <Button
                key={category.name}
                variant={category.highlight ? "default" : "ghost"}
                size="sm"
                className={
                  category.highlight
                    ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-6 whitespace-nowrap"
                    : "hover:bg-accent whitespace-nowrap"
                }
              >
                {category.name}
              </Button>
            );

            return isLink ? (
              <Link key={category.name} to={category.href}>
                {buttonContent}
              </Link>
            ) : (
              buttonContent
            );
          })}
        </div>
      </div>
    </nav>
  );
};
