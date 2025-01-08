'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface CartSummaryProps {
  onClose?: () => void;
}

export default function CartSummary({ onClose }: CartSummaryProps) {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearCart();
      toast({
        title: 'Success',
        description: 'Order placed successfully! Thank you for your purchase.',
      });
      if (onClose) onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process checkout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Your cart is empty</p>
        {onClose && (
          <Button onClick={onClose} variant="outline" className="mt-4">
            Continue Shopping
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <Button onClick={handleCheckout} className="w-full">
            Proceed to Checkout
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose} className="w-full">
              Continue Shopping
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}