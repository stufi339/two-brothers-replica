import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ProductsGrid } from "@/components/ProductsGrid";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <Navigation />
      <main>
        <HeroSection />
        <ProductsGrid />
        <CategorySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
