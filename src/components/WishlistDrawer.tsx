import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { X, ShoppingCart } from "lucide-react";

interface WishlistDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WishlistDrawer = ({ open, onOpenChange }: WishlistDrawerProps) => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>My Wishlist ({wishlist.length})</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Your wishlist is empty</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => onOpenChange(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border rounded-lg bg-card"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-primary font-bold mt-1">₹{item.price}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveToCart(item)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="w-full" onClick={() => onOpenChange(false)}>
                Continue Shopping
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
