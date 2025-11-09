import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat } from "lucide-react";
import { Recipe } from "@/data/recipes";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden h-64">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge
          className={`absolute top-3 right-3 ${getDifficultyColor(
            recipe.difficulty
          )}`}
        >
          {recipe.difficulty}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-3 text-foreground line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span>{recipe.category}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {ingredient}
            </Badge>
          ))}
          {recipe.ingredients.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{recipe.ingredients.length - 3} more
            </Badge>
          )}
        </div>

        <Button 
          className="w-full bg-primary hover:bg-primary/90"
          onClick={() => setIsDialogOpen(true)}
        >
          View Full Recipe
        </Button>
      </CardContent>
      <RecipeDetailDialog 
        recipe={recipe} 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </Card>
  );
};
