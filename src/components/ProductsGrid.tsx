import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { ProductFilters, FilterState } from "./ProductFilters";
import { products as allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

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
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilters}
                onClearAll={handleClearAll}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredAndSortedProducts.length} of {allProducts.length}{" "}
              products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleClearAll}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
