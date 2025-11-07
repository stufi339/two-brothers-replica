import gheeImage from "@/assets/ghee-product.jpg";
import oilImage from "@/assets/oil-product.jpg";
import attaImage from "@/assets/atta-product.jpg";
import riceImage from "@/assets/rice-product.jpg";

export interface Product {
  id: number;
  image: string;
  images?: string[];
  name: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  dietaryTags: string[];
  category: string;
  inStock: boolean;
  healthConcerns?: string[];
  description?: string;
  nutritionalInfo?: string;
}

export const products: Product[] = [
  {
    id: 1,
    image: gheeImage,
    name: "A2 Ghee from Free-Grazing Gir Cows",
    price: "899",
    originalPrice: "1099",
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 245,
    dietaryTags: ["Organic", "Gluten-Free", "Chemical-Free"],
    category: "Ghee",
    inStock: true,
    healthConcerns: ["Immunity Boost", "Gut Health"],
    description: "Pure A2 ghee made from the milk of free-grazing Gir cows. Rich in nutrients and perfect for cooking.",
  },
  {
    id: 2,
    image: oilImage,
    name: "Wood Pressed Organic Cooking Oil Combo",
    price: "649",
    originalPrice: "799",
    rating: 4.6,
    reviewCount: 189,
    dietaryTags: ["Organic", "Cold-Pressed", "Vegan"],
    category: "Oils",
    inStock: true,
    healthConcerns: ["Weight Loss", "Diabetes Care"],
    description: "Traditional wood-pressed oils retaining all natural nutrients and flavors.",
  },
  {
    id: 3,
    image: attaImage,
    name: "Stone Ground Whole Wheat Atta",
    price: "399",
    originalPrice: "499",
    badge: "New",
    rating: 4.7,
    reviewCount: 156,
    dietaryTags: ["Organic", "Chemical-Free", "Non-GMO"],
    category: "Grains",
    inStock: true,
    healthConcerns: ["Gut Health", "Diabetes Care"],
    description: "Freshly stone-ground whole wheat flour preserving all nutrients and fiber.",
  },
  {
    id: 4,
    image: riceImage,
    name: "Organic Basmati Rice Varieties",
    price: "549",
    originalPrice: "699",
    rating: 4.9,
    reviewCount: 312,
    dietaryTags: ["Organic", "Gluten-Free", "Vegan"],
    category: "Rice",
    inStock: true,
    healthConcerns: ["Diabetes Care", "Weight Loss"],
    description: "Premium aged basmati rice with authentic aroma and long grains.",
  },
  {
    id: 5,
    image: gheeImage,
    name: "Premium A2 Bilona Ghee",
    price: "1299",
    originalPrice: "1599",
    badge: "Premium",
    rating: 4.9,
    reviewCount: 428,
    dietaryTags: ["Organic", "Gluten-Free", "Chemical-Free"],
    category: "Ghee",
    inStock: true,
    healthConcerns: ["Immunity Boost", "Gut Health"],
    description: "Handcrafted using traditional Bilona method for maximum nutrition and taste.",
  },
  {
    id: 6,
    image: oilImage,
    name: "Cold Pressed Coconut Oil",
    price: "449",
    originalPrice: "599",
    rating: 4.5,
    reviewCount: 203,
    dietaryTags: ["Organic", "Cold-Pressed", "Vegan", "Chemical-Free"],
    category: "Oils",
    inStock: true,
    healthConcerns: ["Weight Loss", "Immunity Boost"],
    description: "Pure virgin coconut oil extracted through cold-press method.",
  },
  {
    id: 7,
    image: attaImage,
    name: "Multi-Grain Chakki Atta",
    price: "479",
    originalPrice: "599",
    rating: 4.6,
    reviewCount: 167,
    dietaryTags: ["Organic", "Non-GMO"],
    category: "Grains",
    inStock: true,
    healthConcerns: ["Gut Health", "Weight Loss"],
    description: "Nutritious blend of multiple grains for balanced diet and energy.",
  },
  {
    id: 8,
    image: riceImage,
    name: "Organic Brown Rice",
    price: "349",
    originalPrice: "449",
    rating: 4.7,
    reviewCount: 198,
    dietaryTags: ["Organic", "Gluten-Free", "Vegan", "Non-GMO"],
    category: "Rice",
    inStock: true,
    healthConcerns: ["Diabetes Care", "Weight Loss", "Gut Health"],
    description: "Nutritious brown rice packed with fiber and essential nutrients.",
  },
];
