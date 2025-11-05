import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TrustIndicators } from "@/components/TrustIndicators";
import { ProductsGrid } from "@/components/ProductsGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CategorySection } from "@/components/CategorySection";
import { RecipeSection } from "@/components/RecipeSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <Navigation />
      <main>
        <HeroSection />
        <TrustIndicators />
        <ProductsGrid />
        <TestimonialsSection />
        <CategorySection />
        <RecipeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
