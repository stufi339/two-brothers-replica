import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface PaymentMethod {
  type: 'cod' | 'card' | 'upi';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

export interface Order {
  id: string;
  date: string;
  items: any[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CheckoutContextType {
  shippingAddress: ShippingAddress | null;
  paymentMethod: PaymentMethod | null;
  currentOrder: Order | null;
  setShippingAddress: (address: ShippingAddress) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  placeOrder: (items: any[], subtotal: number) => void;
  clearCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const placeOrder = (items: any[], subtotal: number) => {
    const shipping = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.05;
    const total = subtotal + shipping + tax;

    const order: Order = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      items,
      shippingAddress: shippingAddress!,
      paymentMethod: paymentMethod!,
      subtotal,
      shipping,
      tax,
      total,
    };

    setCurrentOrder(order);
  };

  const clearCheckout = () => {
    setShippingAddress(null);
    setPaymentMethod(null);
    setCurrentOrder(null);
  };

  return (
    <CheckoutContext.Provider
      value={{
        shippingAddress,
        paymentMethod,
        currentOrder,
        setShippingAddress,
        setPaymentMethod,
        placeOrder,
        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
