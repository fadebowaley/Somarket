'use client';

import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);


  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === product.id);
      if (existingItem) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(current => current.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  return {
    items,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};