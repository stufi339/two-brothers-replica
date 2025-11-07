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
  instructions: string[];
  tips?: string[];
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
    ingredients: ["2 cups Whole Wheat Atta", "3 tbsp A2 Ghee", "1 tsp Salt", "Water as needed"],
    relatedProducts: [1, 3],
    description: "Traditional Indian flatbread cooked with pure A2 ghee for that authentic taste and aroma.",
    instructions: [
      "Mix atta with salt in a large bowl",
      "Add water gradually and knead into smooth dough",
      "Rest the dough for 15-20 minutes",
      "Divide into equal balls and roll flat",
      "Cook on hot tawa, apply ghee on both sides",
      "Serve hot with your favorite curry",
    ],
    tips: ["Use warm water for softer parathas", "Rest the dough for best results"],
  },
  {
    id: 2,
    title: "Coconut Oil Stir-Fried Vegetables",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop",
    cookTime: "20 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Main Course",
    ingredients: ["3 tbsp Cold Pressed Coconut Oil", "500g Mixed Vegetables", "2 tsp Indian Spices", "Salt to taste"],
    relatedProducts: [6],
    description: "Healthy and flavorful vegetable stir-fry using cold-pressed coconut oil.",
    instructions: [
      "Heat coconut oil in a pan",
      "Add mustard seeds and curry leaves",
      "Add chopped vegetables and stir",
      "Season with spices and salt",
      "Cook for 10-12 minutes on medium heat",
      "Garnish with fresh coriander",
    ],
    tips: ["Don't overcook vegetables to retain nutrients", "Add garlic for extra flavor"],
  },
  {
    id: 3,
    title: "Organic Basmati Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop",
    cookTime: "60 mins",
    difficulty: "Medium",
    servings: 6,
    category: "Main Course",
    ingredients: ["2 cups Organic Basmati Rice", "3 tbsp A2 Ghee", "Mixed Spices", "Vegetables", "Saffron"],
    relatedProducts: [4, 1],
    description: "Aromatic biryani made with premium organic basmati rice and authentic spices.",
    instructions: [
      "Wash and soak rice for 30 minutes",
      "Heat ghee and sauté whole spices",
      "Add vegetables and cook until tender",
      "In another pot, boil rice until 70% done",
      "Layer rice over vegetables",
      "Add saffron milk and cover tightly",
      "Cook on low heat for 20 minutes",
    ],
    tips: ["Use aged basmati for best flavor", "Let it rest 10 minutes before serving"],
  },
  {
    id: 4,
    title: "Ghee-Roasted Mixed Nuts",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=600&fit=crop",
    cookTime: "15 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Snacks",
    ingredients: ["2 tbsp A2 Ghee", "1 cup Cashews", "1 cup Almonds", "Rock Salt", "Black Pepper"],
    relatedProducts: [1],
    description: "Crunchy and healthy snack made with pure ghee and premium dry fruits.",
    instructions: [
      "Heat ghee in a pan on low flame",
      "Add nuts and roast gently",
      "Stir continuously for 8-10 minutes",
      "When golden, remove from heat",
      "Sprinkle salt and pepper while hot",
      "Cool and store in airtight container",
    ],
    tips: ["Roast on low heat to avoid burning", "Store in cool dry place"],
  },
  {
    id: 5,
    title: "Multi-Grain Roti with Wood Pressed Oil",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=600&fit=crop",
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: 6,
    category: "Breakfast",
    ingredients: ["2 cups Multi-Grain Atta", "2 tbsp Wood Pressed Oil", "Salt", "Warm Water"],
    relatedProducts: [7, 2],
    description: "Nutritious multi-grain rotis cooked with healthy wood-pressed organic oil.",
    instructions: [
      "Mix flour and salt",
      "Add oil and mix well",
      "Gradually add warm water and knead",
      "Rest dough for 10 minutes",
      "Roll into thin rotis",
      "Cook on hot tawa until puffed",
    ],
    tips: ["Add oil while kneading for softer rotis", "Serve immediately for best taste"],
  },
  {
    id: 6,
    title: "Traditional Brown Rice Khichdi",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    cookTime: "40 mins",
    difficulty: "Easy",
    servings: 4,
    category: "Main Course",
    ingredients: ["1 cup Organic Brown Rice", "2 tbsp A2 Ghee", "1/2 cup Moong Dal", "Turmeric", "Cumin"],
    relatedProducts: [8, 5],
    description: "Comfort food made healthy with organic brown rice and A2 ghee.",
    instructions: [
      "Wash rice and dal together",
      "Heat ghee and add cumin seeds",
      "Add turmeric and sauté",
      "Add rice, dal and water (1:4 ratio)",
      "Pressure cook for 4-5 whistles",
      "Let pressure release naturally",
    ],
    tips: ["Soak brown rice for 20 minutes before cooking", "Garnish with ghee before serving"],
  },
];
