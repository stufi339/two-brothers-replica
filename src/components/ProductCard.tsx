import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
}

export const ProductCard = ({
  id,
  image,
  name,
  price,
  originalPrice,
  badge,
  rating = 0,
  reviewCount = 0,
}: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-border overflow-hidden">
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
              {badge}
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-background/80 hover:bg-background"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>
          
          {rating > 0 && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewCount} reviews)
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
