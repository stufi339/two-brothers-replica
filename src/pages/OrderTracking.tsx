import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TrackingStatus {
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  completed: boolean;
}

interface OrderTracking {
  orderId: string;
  currentStatus: string;
  estimatedDelivery: string;
  trackingNumber: string;
  timeline: TrackingStatus[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
}

// Mock tracking data
const mockTrackingData: { [key: string]: OrderTracking } = {
  'ORD1234567890': {
    orderId: 'ORD1234567890',
    currentStatus: 'In Transit',
    estimatedDelivery: '2025-11-10',
    trackingNumber: 'TRK9876543210',
    timeline: [
      {
        status: 'Order Placed',
        description: 'Your order has been confirmed and is being prepared',
        timestamp: '2025-11-07 10:30 AM',
        completed: true,
      },
      {
        status: 'Order Processed',
        description: 'Your order has been packed and ready for shipment',
        timestamp: '2025-11-07 02:15 PM',
        completed: true,
      },
      {
        status: 'Shipped',
        description: 'Your order has been picked up by our delivery partner',
        timestamp: '2025-11-08 09:00 AM',
        location: 'Delhi Warehouse',
        completed: true,
      },
      {
        status: 'In Transit',
        description: 'Your package is on the way to the destination',
        timestamp: '2025-11-08 06:30 PM',
        location: 'Mumbai Distribution Center',
        completed: true,
      },
      {
        status: 'Out for Delivery',
        description: 'Your package is out for delivery today',
        timestamp: 'Expected by 2025-11-09',
        completed: false,
      },
      {
        status: 'Delivered',
        description: 'Package delivered successfully',
        timestamp: 'Expected by 2025-11-10',
        completed: false,
      },
    ],
    shippingAddress: {
      name: 'Rajesh Kumar',
      address: '123, MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
  },
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState<OrderTracking | null>(null);
  const [error, setError] = useState('');

  const handleTrackOrder = () => {
    setError('');
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    const data = mockTrackingData[orderId.toUpperCase()];
    if (data) {
      setTrackingData(data);
    } else {
      setError('Order not found. Please check your order ID and try again.');
      setTrackingData(null);
    }
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) return <div className="w-4 h-4 rounded-full border-2 border-muted" />;

    switch (status) {
      case 'Order Placed':
        return <CheckCircle className="w-6 h-6 text-primary" />;
      case 'Order Processed':
        return <Package className="w-6 h-6 text-primary" />;
      case 'Shipped':
      case 'In Transit':
        return <Truck className="w-6 h-6 text-primary" />;
      case 'Out for Delivery':
      case 'Delivered':
        return <MapPin className="w-6 h-6 text-primary" />;
      default:
        return <CheckCircle className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-16 bg-background">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">Track Your Order</h1>
            <p className="text-muted-foreground">Enter your order ID to view shipping status and delivery updates</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter Order ID (e.g., ORD1234567890)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                  />
                  {error && <p className="text-sm text-destructive mt-2">{error}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: ORD1234567890 (demo order)
                  </p>
                </div>
                <Button onClick={handleTrackOrder} className="px-8">
                  <Search className="w-4 h-4 mr-2" />
                  Track
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Order {trackingData.orderId}</CardTitle>
                      <CardDescription>Tracking: {trackingData.trackingNumber}</CardDescription>
                    </div>
                    <Badge className="text-sm">{trackingData.currentStatus}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Delivery Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {trackingData.shippingAddress.name}<br />
                        {trackingData.shippingAddress.address}<br />
                        {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state} - {trackingData.shippingAddress.pincode}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-foreground">Estimated Delivery</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(trackingData.estimatedDelivery).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                  <CardDescription>Follow your order's journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {trackingData.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4 pb-8 last:pb-0">
                        {/* Timeline Icon */}
                        <div className="relative flex flex-col items-center">
                          <div className="flex-shrink-0">
                            {getStatusIcon(item.status, item.completed)}
                          </div>
                          {index < trackingData.timeline.length - 1 && (
                            <div
                              className={`w-0.5 flex-1 mt-2 ${
                                item.completed ? 'bg-primary' : 'bg-muted'
                              }`}
                              style={{ minHeight: '40px' }}
                            />
                          )}
                        </div>

                        {/* Timeline Content */}
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-start mb-1">
                            <h4
                              className={`font-semibold ${
                                item.completed ? 'text-foreground' : 'text-muted-foreground'
                              }`}
                            >
                              {item.status}
                            </h4>
                            <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          {item.location && (
                            <p className="text-xs text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3 inline mr-1" />
                              {item.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderTracking;
