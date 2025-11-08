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
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  ArrowUpDown,
  SlidersHorizontal,
  IndianRupee, 
  Tag, 
  Heart, 
  Leaf,
  Droplets,
  Wheat,
  UtensilsCrossed,
  Shield,
  Sparkles,
  Scale
} from "lucide-react";

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Ghee": return Droplets;
      case "Oils": return Droplets;
      case "Grains": return Wheat;
      case "Rice": return UtensilsCrossed;
      default: return Tag;
    }
  };

  const getHealthIcon = (concern: string) => {
    switch (concern) {
      case "Diabetes Care": return Shield;
      case "Gut Health": return Sparkles;
      case "Immunity Boost": return Heart;
      case "Weight Loss": return Scale;
      default: return Heart;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-md overflow-hidden">
      {/* Header with Active Filters */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/10 p-6 pb-5 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filters
          </h3>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-sm h-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4 mr-1" />
              Clear ({activeFilterCount})
            </Button>
          )}
        </div>
        
        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {filters.category !== "All" && (
              <Badge variant="secondary" className="text-xs">
                {filters.category}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                  onClick={() => handleCategoryChange("All")}
                />
              </Badge>
            )}
            {filters.healthConcerns.map((concern) => (
              <Badge key={concern} variant="secondary" className="text-xs">
                {concern}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                  onClick={() => handleHealthConcernToggle(concern)}
                />
              </Badge>
            ))}
            {filters.dietaryTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                  onClick={() => handleDietaryToggle(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="p-6 space-y-7">
        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-foreground flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-primary" />
            Sort By
          </Label>
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full border-border/60 hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">✨ Featured</SelectItem>
              <SelectItem value="price-low">↗️ Price: Low to High</SelectItem>
              <SelectItem value="price-high">↘️ Price: High to Low</SelectItem>
              <SelectItem value="rating">⭐ Rating: High to Low</SelectItem>
              <SelectItem value="newest">🆕 Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-border/50" />

        {/* Price Range */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-bold text-foreground flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-primary" />
              Price Range
            </Label>
            <Badge variant="outline" className="text-xs font-semibold">
              ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              {filters.priceRange[1] === 2000 && "+"}
            </Badge>
          </div>
          <Slider
            min={0}
            max={2000}
            step={50}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>₹2000+</span>
          </div>
        </div>

        <div className="border-t border-border/50" />

        {/* Category Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-foreground flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            Category
          </Label>
          <RadioGroup value={filters.category} onValueChange={handleCategoryChange}>
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              const isActive = filters.category === category;
              return (
                <div
                  key={category}
                  className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
                    isActive 
                      ? "bg-primary/10 border border-primary/30 shadow-sm" 
                      : "hover:bg-muted/70 border border-transparent"
                  }`}
                >
                  <RadioGroupItem value={category} id={category} />
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <Label
                    htmlFor={category}
                    className={`cursor-pointer text-sm flex-1 ${
                      isActive ? "font-semibold text-foreground" : "font-normal"
                    }`}
                  >
                    {category}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <div className="border-t border-border/50" />

        {/* Health Concerns */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-foreground flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            Health Concerns
          </Label>
          <div className="space-y-1.5">
            {healthConcerns.map((concern) => {
              const Icon = getHealthIcon(concern);
              const isActive = filters.healthConcerns.includes(concern);
              return (
                <div
                  key={concern}
                  className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
                    isActive 
                      ? "bg-accent/40 border border-primary/20 shadow-sm" 
                      : "hover:bg-muted/70 border border-transparent"
                  }`}
                >
                  <Checkbox
                    id={concern}
                    checked={isActive}
                    onCheckedChange={() => handleHealthConcernToggle(concern)}
                  />
                  <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <Label
                    htmlFor={concern}
                    className={`cursor-pointer text-sm flex-1 ${
                      isActive ? "font-semibold text-foreground" : "font-normal"
                    }`}
                  >
                    {concern}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border/50" />

        {/* Dietary Tags */}
        <div className="space-y-3">
          <Label className="text-sm font-bold text-foreground flex items-center gap-2">
            <Leaf className="h-4 w-4 text-primary" />
            Dietary Preferences
          </Label>
          <div className="space-y-1.5">
            {dietaryOptions.map((tag) => {
              const isActive = filters.dietaryTags.includes(tag);
              return (
                <div
                  key={tag}
                  className={`flex items-center space-x-3 py-2.5 px-3 rounded-lg transition-all duration-200 cursor-pointer group ${
                    isActive 
                      ? "bg-accent/40 border border-primary/20 shadow-sm" 
                      : "hover:bg-muted/70 border border-transparent"
                  }`}
                >
                  <Checkbox
                    id={tag}
                    checked={isActive}
                    onCheckedChange={() => handleDietaryToggle(tag)}
                  />
                  <Sparkles className={`h-3.5 w-3.5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  <Label
                    htmlFor={tag}
                    className={`cursor-pointer text-sm flex-1 ${
                      isActive ? "font-semibold text-foreground" : "font-normal"
                    }`}
                  >
                    {tag}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
