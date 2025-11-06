import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCheckout, ShippingAddress, PaymentMethod } from "@/context/CheckoutContext";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentMethod as PaymentMethodComponent } from "@/components/checkout/PaymentMethod";
import { OrderReview } from "@/components/checkout/OrderReview";
import { cn } from "@/lib/utils";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { setShippingAddress, setPaymentMethod, placeOrder, shippingAddress, paymentMethod } = useCheckout();
  const [currentStep, setCurrentStep] = useState(1);

  const subtotal = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some products to checkout</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Shipping" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Review" },
  ];

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingAddress(data);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (data: PaymentMethod) => {
    setPaymentMethod(data);
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    placeOrder(cart, subtotal);
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <Navigation />

      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-all",
                        currentStep > step.number
                          ? "bg-primary text-primary-foreground"
                          : currentStep === step.number
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-sm mt-2 font-medium",
                        currentStep >= step.number
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-1 flex-1 mx-4 transition-all",
                        currentStep > step.number ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-background rounded-lg border p-6">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingAddress} />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <PaymentMethodComponent
                  onSubmit={handlePaymentSubmit}
                  onBack={() => setCurrentStep(1)}
                />
              </div>
            )}

            {currentStep === 3 && shippingAddress && paymentMethod && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                <OrderReview
                  cartItems={cart}
                  shippingAddress={shippingAddress}
                  paymentMethod={paymentMethod}
                  subtotal={subtotal}
                  onBack={() => setCurrentStep(2)}
                  onPlaceOrder={handlePlaceOrder}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
