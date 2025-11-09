import { useState } from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing to our newsletter!");
      setEmail("");
    }
  };

  const handleSocialClick = (platform: string) => {
    toast.info(`Follow us on ${platform}!`);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">TWO BROTHERS ORGANIC FARMS</h3>
            <p className="text-sm text-primary-foreground/80">
              Bringing you the finest organic produce straight from our farms to your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/curated-picks" className="hover:text-primary-foreground transition-colors">Curated Picks</Link></li>
              <li><Link to="/farm-life" className="hover:text-primary-foreground transition-colors">Our Farm</Link></li>
              <li><Link to="/order-tracking" className="hover:text-primary-foreground transition-colors">Track Order</Link></li>
              <li><a href="mailto:contact@twobrothersorganicfarms.com" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#faq" className="hover:text-primary-foreground transition-colors" onClick={(e) => { e.preventDefault(); toast.info("FAQs coming soon!"); }}>FAQs</a></li>
              <li><a href="#shipping" className="hover:text-primary-foreground transition-colors" onClick={(e) => { e.preventDefault(); toast.info("Shipping Policy coming soon!"); }}>Shipping Policy</a></li>
              <li><a href="#returns" className="hover:text-primary-foreground transition-colors" onClick={(e) => { e.preventDefault(); toast.info("Return Policy coming soon!"); }}>Return Policy</a></li>
              <li><a href="#privacy" className="hover:text-primary-foreground transition-colors" onClick={(e) => { e.preventDefault(); toast.info("Privacy Policy coming soon!"); }}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mb-4">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
            <div className="flex gap-3">
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary-foreground/10"
                onClick={() => handleSocialClick("Facebook")}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary-foreground/10"
                onClick={() => handleSocialClick("Instagram")}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary-foreground/10"
                onClick={() => handleSocialClick("Twitter")}
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="hover:bg-primary-foreground/10"
                onClick={() => handleSocialClick("YouTube")}
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© 2025 Two Brothers Organic Farms. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
