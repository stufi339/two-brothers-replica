import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import { SearchOverlay } from "./SearchOverlay";
import { LoginDialog } from "./LoginDialog";
import { WishlistDrawer } from "./WishlistDrawer";
import { MobileMenu } from "./MobileMenu";
import { Badge } from "./ui/badge";

export const Header = () => {
  const { getTotalItems } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery, setIsSearchOpen } = useSearch();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const totalItems = getTotalItems();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchOpen(value.trim().length > 0);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent min-h-[44px] min-w-[44px]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search - Desktop always visible, Mobile collapsible */}
            <div className={`relative transition-all duration-300 ${
              isSearchExpanded 
                ? "absolute left-0 right-0 top-0 z-50 bg-background p-4 shadow-lg md:relative md:shadow-none md:p-0 md:flex-1 md:max-w-md" 
                : "md:flex-1 md:max-w-md"
            }`}>
              {isSearchExpanded ? (
                // Expanded mobile search
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for products..."
                      className="pl-10 bg-muted/50 border-border h-11"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      autoFocus
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="min-h-[44px] min-w-[44px]"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  {/* Desktop search - always visible */}
                  <div className="hidden md:block relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for products..."
                      className="pl-10 bg-muted/50 border-border"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  {/* Mobile search button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:bg-accent min-h-[44px] min-w-[44px]"
                    onClick={() => setIsSearchExpanded(true)}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </>
              )}
              <SearchOverlay />
            </div>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-primary text-center hover:opacity-80 transition-opacity">
                TWO BROTHERS
                <span className="hidden sm:block text-xs md:text-sm font-normal text-muted-foreground tracking-wider">
                  ORGANIC FARMS
                </span>
              </h1>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent min-h-[44px] min-w-[44px]"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent relative min-h-[44px] min-w-[44px]"
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
                <Button variant="ghost" size="icon" className="hover:bg-accent relative min-h-[44px] min-w-[44px]">
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
      <MobileMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />
    </>
  );
};
