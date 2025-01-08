"use client";

import { useAuth } from "@/hooks/useAuth";
import CartSummary from "@/components/cart/CartSummary";
import Navbar from "@/components/layout/Navbar";

export default function CartPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
