import { ProductCard } from "./ProductCard";
import gheeImage from "@/assets/ghee-product.jpg";
import oilImage from "@/assets/oil-product.jpg";
import attaImage from "@/assets/atta-product.jpg";
import riceImage from "@/assets/rice-product.jpg";

const products = [
  {
    id: 1,
    image: gheeImage,
    name: "A2 Ghee from Free-Grazing Gir Cows",
    price: "899",
    originalPrice: "1099",
    badge: "Bestseller",
  },
  {
    id: 2,
    image: oilImage,
    name: "Wood Pressed Organic Cooking Oil Combo",
    price: "649",
    originalPrice: "799",
  },
  {
    id: 3,
    image: attaImage,
    name: "Stone Ground Whole Wheat Atta",
    price: "399",
    originalPrice: "499",
    badge: "New",
  },
  {
    id: 4,
    image: riceImage,
    name: "Organic Basmati Rice Varieties",
    price: "549",
    originalPrice: "699",
  },
  {
    id: 5,
    image: gheeImage,
    name: "Premium A2 Bilona Ghee",
    price: "1299",
    originalPrice: "1599",
    badge: "Premium",
  },
  {
    id: 6,
    image: oilImage,
    name: "Cold Pressed Coconut Oil",
    price: "449",
    originalPrice: "599",
  },
  {
    id: 7,
    image: attaImage,
    name: "Multi-Grain Chakki Atta",
    price: "479",
    originalPrice: "599",
  },
  {
    id: 8,
    image: riceImage,
    name: "Organic Brown Rice",
    price: "349",
    originalPrice: "449",
  },
];

export const ProductsGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Featured Products
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Under ₹999
            </button>
            <button className="px-4 py-2 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/80 transition-colors">
              All Products
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
