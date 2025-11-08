import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ProductFilters, FilterState } from "./ProductFilters";
import { products as allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal, Grid3x3, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ProductsGrid = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 2000],
    dietaryTags: [],
    category: "All",
    sortBy: "featured",
    healthConcerns: [],
  });

  useEffect(() => {
    const category = searchParams.get("category");
    const concern = searchParams.get("concern");

    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
    if (concern) {
      setFilters((prev) => ({ ...prev, healthConcerns: [concern] }));
    }
  }, [searchParams]);

  const handleClearAll = () => {
    setFilters({
      priceRange: [0, 2000],
      dietaryTags: [],
      category: "All",
      sortBy: "featured",
      healthConcerns: [],
    });
  };

  const activeFilterCount =
    filters.dietaryTags.length +
    filters.healthConcerns.length +
    (filters.category !== "All" ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const price = parseInt(product.price);
      const matchesPrice =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const matchesCategory =
        filters.category === "All" || product.category === filters.category;
      const matchesDietary =
        filters.dietaryTags.length === 0 ||
        filters.dietaryTags.every((tag) => product.dietaryTags.includes(tag));
      const matchesHealthConcern =
        filters.healthConcerns.length === 0 ||
        filters.healthConcerns.some((concern) =>
          product.healthConcerns?.includes(concern)
        );

      return matchesPrice && matchesCategory && matchesDietary && matchesHealthConcern;
    });

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [filters]);

  return (
    <section id="products" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Featured Products
          </h2>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-96 overflow-y-auto p-0">
              <SheetHeader className="p-6 pb-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  Product Filters
                </SheetTitle>
              </SheetHeader>
              <div className="p-4">
                <ProductFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onClearAll={handleClearAll}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filters Sidebar - Sticky */}
          <div className="hidden md:block lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onClearAll={handleClearAll}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Grid3x3 className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> of <span className="font-semibold text-foreground">{allProducts.length}</span> products
                </p>
              </div>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="gap-1">
                  {activeFilterCount} Active {activeFilterCount === 1 ? 'Filter' : 'Filters'}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredAndSortedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16 px-4 bg-muted/30 rounded-xl border-2 border-dashed border-border">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or clear all to see all products
                  </p>
                  <Button
                    variant="default"
                    onClick={handleClearAll}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
