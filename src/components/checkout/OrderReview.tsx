import { ShoppingBag, MapPin, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShippingAddress, PaymentMethod } from "@/context/CheckoutContext";

interface OrderReviewProps {
  cartItems: any[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const OrderReview = ({
  cartItems,
  shippingAddress,
  paymentMethod,
  subtotal,
  onBack,
  onPlaceOrder,
}: OrderReviewProps) => {
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const getPaymentMethodText = () => {
    if (paymentMethod.type === 'cod') return 'Cash on Delivery';
    if (paymentMethod.type === 'card') return `Card ending in ${paymentMethod.cardNumber?.slice(-4)}`;
    if (paymentMethod.type === 'upi') return `UPI: ${paymentMethod.upiId}`;
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Order Items ({cartItems.length})</h3>
          </div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{parseInt(item.price) * item.quantity}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Shipping Address</h3>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{shippingAddress.fullName}</p>
            <p className="text-muted-foreground">{shippingAddress.email}</p>
            <p className="text-muted-foreground">{shippingAddress.phone}</p>
            <p className="text-muted-foreground">{shippingAddress.address}</p>
            <p className="text-muted-foreground">
              {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Payment Method</h3>
          </div>
          <p className="text-sm">{getPaymentMethodText()}</p>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Order Summary</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onPlaceOrder} size="lg" className="flex-1">
          Place Order
        </Button>
      </div>
    </div>
  );
};
