import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Package, MapPin, CreditCard, Download } from "lucide-react";
import { useCheckout } from "@/context/CheckoutContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { currentOrder } = useCheckout();

  useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder, navigate]);

  if (!currentOrder) {
    return null;
  }

  const getPaymentMethodText = () => {
    if (currentOrder.paymentMethod.type === 'cod') return 'Cash on Delivery';
    if (currentOrder.paymentMethod.type === 'card') return `Card ending in ${currentOrder.paymentMethod.cardNumber?.slice(-4)}`;
    if (currentOrder.paymentMethod.type === 'upi') return `UPI: ${currentOrder.paymentMethod.upiId}`;
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <Navigation />

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Banner */}
          <Card className="mb-8 border-primary/50 bg-primary/5">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
              <p className="text-muted-foreground mb-4">
                Thank you for your purchase. Your order is being processed.
              </p>
              <div className="inline-flex items-center gap-2 bg-background px-6 py-3 rounded-lg">
                <span className="text-sm text-muted-foreground">Order ID:</span>
                <span className="font-mono font-semibold text-lg">{currentOrder.id}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Order Items</h3>
                </div>
                <div className="space-y-4">
                  {currentOrder.items.map((item) => (
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

            {/* Delivery Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Delivery Address</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{currentOrder.shippingAddress.fullName}</p>
                    <p className="text-muted-foreground">{currentOrder.shippingAddress.email}</p>
                    <p className="text-muted-foreground">{currentOrder.shippingAddress.phone}</p>
                    <p className="text-muted-foreground">{currentOrder.shippingAddress.address}</p>
                    <p className="text-muted-foreground">
                      {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Payment Method</h3>
                  </div>
                  <p className="text-sm mb-4">{getPaymentMethodText()}</p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{currentOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{currentOrder.shipping === 0 ? 'FREE' : `₹${currentOrder.shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{currentOrder.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Paid</span>
                      <span className="text-primary">₹{currentOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Estimate */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Estimated Delivery</h3>
                <p className="text-muted-foreground">
                  Your order will be delivered within 5-7 business days. You will receive a tracking number via email once your order ships.
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Button className="flex-1 gap-2">
                <Download className="h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
