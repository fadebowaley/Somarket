'use client';

import { products } from '@/lib/data/products';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

export default function ProductList() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
      toast({
        title: 'Added to Cart',
        description: `${product.name} has been added to your cart.`
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold">${product.price}</span>
              <Button
                onClick={() => handleAddToCart(product.id)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}