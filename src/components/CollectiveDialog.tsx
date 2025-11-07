import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface CollectiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CollectiveDialog = ({
  open,
  onOpenChange,
}: CollectiveDialogProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome to the Collective! Check your email for details.");
    onOpenChange(false);
    setEmail("");
    setName("");
  };

  const benefits = [
    "Permanent 12% discount on all products",
    "Early access to new product launches",
    "Exclusive recipes and cooking tips",
    "Priority customer support",
    "Free shipping on orders above ₹999",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Join Two Brothers Collective
          </DialogTitle>
          <DialogDescription>
            Get permanent discounts and exclusive benefits
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-leaf-green mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collective-name">Full Name</Label>
              <Input
                id="collective-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collective-email">Email</Label>
              <Input
                id="collective-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save Me A Spot
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
