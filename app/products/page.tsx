"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProductList from "@/components/products/ProductList";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowCart(!showCart)}
            className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Button>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {showCart ? (
        <div className="max-w-2xl mx-auto">
          <CartSummary onClose={() => setShowCart(false)} />
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}
