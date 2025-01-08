"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          SO Market
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.firstname}!</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

          <Link href="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
