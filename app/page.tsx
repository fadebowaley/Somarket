'use client';

import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import CartSummary from '@/components/cart/CartSummary';
import ProductList from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [showCart, setShowCart] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={showLogin ? 'default' : 'outline'}
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
            <Button
              variant={!showLogin ? 'default' : 'outline'}
              onClick={() => setShowLogin(false)}
            >
              Sign Up
            </Button>
          </div>
          {showLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowCart(!showCart)}
            className="flex items-center gap-2"
          >
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