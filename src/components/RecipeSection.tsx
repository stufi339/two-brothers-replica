import { recipes } from "@/data/recipes";
import { RecipeCard } from "./RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = ["All", "Breakfast", "Main Course", "Snacks"];

export const RecipeSection = () => {
  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Delicious Recipes Using Our Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover healthy and tasty recipes crafted with our organic
            ingredients
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="w-full justify-center mb-8 flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-6 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes
                  .filter(
                    (recipe) =>
                      category === "All" || recipe.category === category
                  )
                  .map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
