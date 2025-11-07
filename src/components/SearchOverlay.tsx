import { Link } from "react-router-dom";
import { useSearch } from "@/context/SearchContext";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SearchOverlay = () => {
  const { searchQuery, searchResults, isSearchOpen, setIsSearchOpen } =
    useSearch();

  if (!isSearchOpen || !searchQuery.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-50 max-h-[400px] overflow-y-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {searchResults.length} results for "{searchQuery}"
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {searchResults.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            No products found
          </p>
        ) : (
          <div className="space-y-2">
            {searchResults.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => setIsSearchOpen(false)}
                className="flex gap-4 p-3 hover:bg-accent rounded-lg transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {product.category}
                  </p>
                  <p className="text-primary font-bold mt-1">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
