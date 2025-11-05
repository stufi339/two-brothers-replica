export interface Recipe {
  id: number;
  title: string;
  image: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  category: string;
  ingredients: string[];
  relatedProducts: number[];
  description: string;
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Ghee Roasted Parathas",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
    cookTime: "30 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Breakfast",
    ingredients: ["Whole Wheat Atta", "A2 Ghee", "Salt", "Water"],
    relatedProducts: [1, 3],
    description: "Traditional Indian flatbread cooked with pure A2 ghee for that authentic taste and aroma.",
  },
  {
    id: 2,
    title: "Coconut Oil Stir-Fried Vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    cookTime: "20 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Main Course",
    ingredients: ["Cold Pressed Coconut Oil", "Mixed Vegetables", "Indian Spices", "Salt"],
    relatedProducts: [6],
    description: "Healthy and flavorful vegetable stir-fry using cold-pressed coconut oil.",
  },
  {
    id: 3,
    title: "Organic Basmati Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop",
    cookTime: "60 mins",
    difficulty: "Medium",
    servings: 6,
    category: "Main Course",
    ingredients: ["Organic Basmati Rice", "A2 Ghee", "Mixed Spices", "Vegetables"],
    relatedProducts: [4, 1],
    description: "Aromatic biryani made with premium organic basmati rice and authentic spices.",
  },
  {
    id: 4,
    title: "Ghee-Roasted Mixed Nuts",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=600&fit=crop",
    cookTime: "15 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Snacks",
    ingredients: ["A2 Ghee", "Cashews", "Almonds", "Rock Salt", "Black Pepper"],
    relatedProducts: [1],
    description: "Crunchy and healthy snack made with pure ghee and premium dry fruits.",
  },
  {
    id: 5,
    title: "Multi-Grain Roti with Wood Pressed Oil",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop",
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: 6,
    category: "Breakfast",
    ingredients: ["Multi-Grain Atta", "Wood Pressed Oil", "Salt", "Warm Water"],
    relatedProducts: [7, 2],
    description: "Nutritious multi-grain rotis cooked with healthy wood-pressed organic oil.",
  },
  {
    id: 6,
    title: "Traditional Brown Rice Khichdi",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    cookTime: "40 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Main Course",
    ingredients: ["Organic Brown Rice", "A2 Ghee", "Moong Dal", "Turmeric", "Cumin"],
    relatedProducts: [8, 5],
    description: "Comfort food made healthy with organic brown rice and A2 ghee.",
  },
];
