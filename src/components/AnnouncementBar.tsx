import { useState, useEffect } from "react";
import { Truck, Gift } from "lucide-react";

const announcements = [
  { icon: Truck, text: "🚚 Enjoy Free Shipping on order above ₹1499 | Shop Now" },
  { icon: Gift, text: "So many perks await! Membership now LIVE🎊" },
];

export const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const Icon = announcements[currentIndex].icon;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm overflow-hidden">
      <div className="flex items-center justify-center gap-2 animate-in fade-in duration-500">
        <span>{announcements[currentIndex].text}</span>
      </div>
    </div>
  );
};
