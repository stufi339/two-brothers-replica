import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CuratedPicks = () => {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary mb-8">Curated Picks</h1>
        <p className="text-muted-foreground text-lg">Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
};

export default CuratedPicks;
