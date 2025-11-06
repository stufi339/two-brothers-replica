import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { DetailedReviews } from "@/components/DetailedReviews";
import { useCart } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const mockReviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2 weeks ago",
      text: "Excellent quality! The taste is authentic and pure. My family loves it. Highly recommend for anyone looking for genuine organic products.",
      verified: true,
      helpful: 24,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 5,
      date: "1 month ago",
      text: "Best quality I've found online. Worth every rupee. The packaging was also excellent and arrived fresh.",
      verified: true,
      helpful: 18,
    },
    {
      id: 3,
      name: "Anjali Patel",
      rating: 4,
      date: "1 month ago",
      text: "Very good product. Slightly expensive but the quality justifies the price. Will order again.",
      verified: true,
      helpful: 12,
    },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <Navigation />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          {/* Product Details Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <ProductImageGallery
              images={[product.image, product.image, product.image, product.image]}
              productName={product.name}
            />

            {/* Product Info */}
            <div className="space-y-6">
              {product.badge && (
                <Badge variant="secondary" className="text-sm">
                  {product.badge}
                </Badge>
              )}
              
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= product.rating ? "text-yellow-400" : "text-muted"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive">
                      {Math.round(((parseInt(product.originalPrice) - parseInt(product.price)) / parseInt(product.originalPrice)) * 100)}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-2">
                {product.dietaryTags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Product Description */}
              <div className="space-y-2">
                <h3 className="font-semibold">Product Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Premium quality {product.category.toLowerCase()} sourced directly from our organic farms. 
                  Made with traditional methods to preserve nutritional value and authentic taste. 
                  Free from chemicals, pesticides, and artificial additives. 
                  Perfect for health-conscious families who value purity and quality.
                </p>
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <DetailedReviews
              reviews={mockReviews}
              averageRating={product.rating}
              totalReviews={product.reviewCount}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
