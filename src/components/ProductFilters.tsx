import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface FilterState {
  priceRange: [number, number];
  dietaryTags: string[];
  category: string;
  sortBy: string;
  healthConcerns: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
}

const dietaryOptions = [
  "Vegan",
  "Gluten-Free",
  "Organic",
  "Sugar-Free",
  "Cold-Pressed",
  "Chemical-Free",
  "Non-GMO",
];

const categories = ["All", "Ghee", "Oils", "Grains", "Rice"];

const healthConcerns = [
  "Diabetes Care",
  "Gut Health",
  "Immunity Boost",
  "Weight Loss",
];

export const ProductFilters = ({
  filters,
  onFilterChange,
  onClearAll,
}: ProductFiltersProps) => {
  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleDietaryToggle = (tag: string) => {
    const newTags = filters.dietaryTags.includes(tag)
      ? filters.dietaryTags.filter((t) => t !== tag)
      : [...filters.dietaryTags, tag];
    onFilterChange({ ...filters, dietaryTags: newTags });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const handleHealthConcernToggle = (concern: string) => {
    const newConcerns = filters.healthConcerns.includes(concern)
      ? filters.healthConcerns.filter((c) => c !== concern)
      : [...filters.healthConcerns, concern];
    onFilterChange({ ...filters, healthConcerns: newConcerns });
  };

  const activeFilterCount =
    filters.dietaryTags.length +
    filters.healthConcerns.length +
    (filters.category !== "All" ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-sm h-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Sort By</Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-border/50 pt-6" />

        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">Price Range</Label>
            <span className="text-sm font-medium text-primary">
              ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              {filters.priceRange[1] === 2000 && "+"}
            </span>
          </div>
          <Slider
            min={0}
            max={2000}
            step={50}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
        </div>

        <div className="border-t border-border/50 pt-6" />

        {/* Category Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Category</Label>
          <RadioGroup value={filters.category} onValueChange={handleCategoryChange}>
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center space-x-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors px-1"
              >
                <RadioGroupItem value={category} id={category} />
                <Label
                  htmlFor={category}
                  className="cursor-pointer font-normal text-sm flex-1"
                >
                  {category}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="border-t border-border/50 pt-6" />

        {/* Health Concerns */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Health Concerns</Label>
          <div className="space-y-1">
            {healthConcerns.map((concern) => (
              <div
                key={concern}
                className="flex items-center space-x-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors px-1"
              >
                <Checkbox
                  id={concern}
                  checked={filters.healthConcerns.includes(concern)}
                  onCheckedChange={() => handleHealthConcernToggle(concern)}
                />
                <Label
                  htmlFor={concern}
                  className="cursor-pointer font-normal text-sm flex-1"
                >
                  {concern}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/50 pt-6" />

        {/* Dietary Tags */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Dietary Preferences</Label>
          <div className="space-y-1">
            {dietaryOptions.map((tag) => (
              <div
                key={tag}
                className="flex items-center space-x-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors px-1"
              >
                <Checkbox
                  id={tag}
                  checked={filters.dietaryTags.includes(tag)}
                  onCheckedChange={() => handleDietaryToggle(tag)}
                />
                <Label
                  htmlFor={tag}
                  className="cursor-pointer font-normal text-sm flex-1"
                >
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
