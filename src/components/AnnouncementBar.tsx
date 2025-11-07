import { useState, useEffect } from "react";
import { Truck, Gift } from "lucide-react";

const announcements = [
  { 
    icon: Truck, 
    text: "🚚 Enjoy Free Shipping on order above ₹1499 | ",
    link: "Shop Now",
    href: "#products" 
  },
  { 
    icon: Gift, 
    text: "So many perks await! Membership now LIVE🎊 | ",
    link: "Join Now",
    href: "#collective"
  },
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (href: string) => {
    const target = href.replace("#", "");
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm overflow-hidden">
      <div className="flex items-center justify-center gap-2 animate-in fade-in duration-500">
        <span>{announcements[currentIndex].text}</span>
        <button
          onClick={() => handleClick(announcements[currentIndex].href)}
          className="underline font-semibold hover:opacity-80 transition-opacity"
        >
          {announcements[currentIndex].link}
        </button>
      </div>
    </div>
  );
};
