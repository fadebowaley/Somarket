"use client";

import { products } from "@/lib/data/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Minus, Plus } from "lucide-react";

interface ProductListProps {
  searchQuery?: string;
}

export default function ProductList({ searchQuery = "" }: ProductListProps) {
  const { addToCart, removeFromCart, items } = useCart();
  const { toast } = useToast();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      toast({
        title: "Removed from Cart",
        description: `${product.name} has been removed from your cart.`,
      });
    }
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find((item) => item.id === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => {
        const quantity = getItemQuantity(product.id);

        return (
          <Card key={product.id} className="overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                {quantity > 0 ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleRemoveFromCart(product.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleAddToCart(product.id)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
