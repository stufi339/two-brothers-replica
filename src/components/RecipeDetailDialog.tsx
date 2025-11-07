import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import { Recipe } from "@/data/recipes";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecipeDetailDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecipeDetailDialog = ({
  recipe,
  open,
  onOpenChange,
}: RecipeDetailDialogProps) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-leaf-green text-white";
      case "medium":
        return "bg-secondary text-secondary-foreground";
      case "hard":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <ScrollArea className="h-full pr-4">
          <DialogHeader>
            <div className="relative">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Badge
                className={`absolute top-4 right-4 ${getDifficultyColor(
                  recipe.difficulty
                )}`}
              >
                {recipe.difficulty}
              </Badge>
            </div>
            <DialogTitle className="text-2xl mt-4">{recipe.title}</DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            <p className="text-muted-foreground">{recipe.description}</p>

            {/* Meta Info */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{recipe.category}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="font-bold text-lg mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="font-bold text-lg mb-3">Instructions</h3>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="font-bold text-primary min-w-[24px]">
                      {index + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <div className="bg-accent/50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Chef's Tips</h3>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
