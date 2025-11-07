import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import { SearchOverlay } from "./SearchOverlay";
import { LoginDialog } from "./LoginDialog";
import { WishlistDrawer } from "./WishlistDrawer";
import { Badge } from "./ui/badge";

export const Header = () => {
  const { getTotalItems } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery, setIsSearchOpen } = useSearch();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const totalItems = getTotalItems();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchOpen(value.trim().length > 0);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10 bg-muted/50 border-border"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <SearchOverlay />
            </div>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl md:text-3xl font-bold text-primary text-center hover:opacity-80 transition-opacity">
                TWO BROTHERS
                <span className="block text-sm font-normal text-muted-foreground tracking-wider">
                  ORGANIC FARMS
                </span>
              </h1>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent relative"
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {wishlist.length}
                  </Badge>
                )}
              </Button>
              <Link to="/checkout">
                <Button variant="ghost" size="icon" className="hover:bg-accent relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-secondary text-secondary-foreground">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <WishlistDrawer open={isWishlistOpen} onOpenChange={setIsWishlistOpen} />
    </>
  );
};
