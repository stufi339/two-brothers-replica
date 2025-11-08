import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { SearchProvider } from "@/context/SearchContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import FarmLife from "./pages/FarmLife";
import CuratedPicks from "./pages/CuratedPicks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <WishlistProvider>
        <CartProvider>
          <CheckoutProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/track-order" element={<OrderTracking />} />
                  <Route path="/farm-life" element={<FarmLife />} />
                  <Route path="/curated-picks" element={<CuratedPicks />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CheckoutProvider>
        </CartProvider>
      </WishlistProvider>
    </SearchProvider>
  </QueryClientProvider>
);

export default App;
