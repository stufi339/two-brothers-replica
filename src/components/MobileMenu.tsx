import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { name: "🥄 Ghee", category: "Ghee", type: "category" },
  { name: "🌾 Atta & Grains", category: "Grains", type: "category" },
  { name: "🌿 Oils", category: "Oils", type: "category" },
  { name: "🍚 Rice", category: "Rice", type: "category" },
  { name: "Shop by Category", href: "#products", type: "scroll" },
  { name: "Shop by Concern", href: "#concerns", type: "scroll" },
  { name: "Curated Picks", href: "/curated-picks", type: "link" },
  { name: "Farm Life", href: "/farm-life", type: "link" },
  { name: "Track Order", href: "/order-tracking", type: "link" },
];

export const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleClick = (item: typeof menuItems[0]) => {
    if (item.type === "category") {
      navigate(`/?category=${item.category}#products`);
      setTimeout(() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      onOpenChange(false);
    } else if (item.type === "scroll") {
      const target = item.href?.replace("#", "");
      document.getElementById(target || "")?.scrollIntoView({ behavior: "smooth" });
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left text-primary font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-2">
          {menuItems.map((item) => {
            if (item.type === "link") {
              return (
                <SheetClose asChild key={item.name}>
                  <Link to={item.href || "#"}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-12 text-base hover:bg-accent"
                    >
                      {item.name}
                    </Button>
                  </Link>
                </SheetClose>
              );
            }

            return (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => handleClick(item)}
                className="w-full justify-start h-12 text-base hover:bg-accent"
              >
                {item.name}
              </Button>
            );
          })}
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <Link to="/" onClick={() => onOpenChange(false)}>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="font-bold text-primary text-lg">TWO BROTHERS</p>
              <p className="text-sm text-muted-foreground tracking-wider">ORGANIC FARMS</p>
            </div>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
