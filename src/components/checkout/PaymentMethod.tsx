import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethod as PaymentMethodType } from "@/context/CheckoutContext";
import { cn } from "@/lib/utils";

const cardSchema = z.object({
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
  cardName: z.string().min(2, "Name is required").max(100),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Format: MM/YY"),
  cvv: z.string().regex(/^[0-9]{3}$/, "CVV must be 3 digits"),
});

const upiSchema = z.object({
  upiId: z.string().regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format"),
});

interface PaymentMethodProps {
  onSubmit: (data: PaymentMethodType) => void;
  onBack: () => void;
}

export const PaymentMethod = ({ onSubmit, onBack }: PaymentMethodProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'cod' | 'card' | 'upi'>('cod');

  const cardForm = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const upiForm = useForm({
    resolver: zodResolver(upiSchema),
    defaultValues: {
      upiId: "",
    },
  });

  const handleSubmit = () => {
    if (selectedMethod === 'cod') {
      onSubmit({ type: 'cod' });
    } else if (selectedMethod === 'card') {
      cardForm.handleSubmit((data) => {
        onSubmit({ type: 'card', ...data });
      })();
    } else if (selectedMethod === 'upi') {
      upiForm.handleSubmit((data) => {
        onSubmit({ type: 'upi', ...data });
      })();
    }
  };

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedMethod} onValueChange={(value: any) => setSelectedMethod(value)}>
        <Card className={cn("p-4 cursor-pointer transition-all", selectedMethod === 'cod' && "ring-2 ring-primary")}>
          <label className="flex items-center gap-3 cursor-pointer">
            <RadioGroupItem value="cod" id="cod" />
            <Banknote className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-semibold">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
            </div>
          </label>
        </Card>

        <Card className={cn("p-4 cursor-pointer transition-all", selectedMethod === 'card' && "ring-2 ring-primary")}>
          <label className="flex items-center gap-3 cursor-pointer">
            <RadioGroupItem value="card" id="card" />
            <CreditCard className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-semibold">Credit/Debit Card</p>
              <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
            </div>
          </label>
          {selectedMethod === 'card' && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...cardForm.register('cardNumber')}
                />
                {cardForm.formState.errors.cardNumber && (
                  <p className="text-sm text-destructive mt-1">{cardForm.formState.errors.cardNumber.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  {...cardForm.register('cardName')}
                />
                {cardForm.formState.errors.cardName && (
                  <p className="text-sm text-destructive mt-1">{cardForm.formState.errors.cardName.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    {...cardForm.register('expiryDate')}
                  />
                  {cardForm.formState.errors.expiryDate && (
                    <p className="text-sm text-destructive mt-1">{cardForm.formState.errors.expiryDate.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    type="password"
                    maxLength={3}
                    {...cardForm.register('cvv')}
                  />
                  {cardForm.formState.errors.cvv && (
                    <p className="text-sm text-destructive mt-1">{cardForm.formState.errors.cvv.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className={cn("p-4 cursor-pointer transition-all", selectedMethod === 'upi' && "ring-2 ring-primary")}>
          <label className="flex items-center gap-3 cursor-pointer">
            <RadioGroupItem value="upi" id="upi" />
            <Smartphone className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <p className="font-semibold">UPI Payment</p>
              <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
            </div>
          </label>
          {selectedMethod === 'upi' && (
            <div className="mt-4">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@upi"
                {...upiForm.register('upiId')}
              />
              {upiForm.formState.errors.upiId && (
                <p className="text-sm text-destructive mt-1">{upiForm.formState.errors.upiId.message}</p>
              )}
            </div>
          )}
        </Card>
      </RadioGroup>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Continue to Review
        </Button>
      </div>
    </div>
  );
};
