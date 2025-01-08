"use client";

import { useAuth } from "@/hooks/useAuth";
import ProductList from "@/components/products/ProductList";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto mb-8">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <ProductList searchQuery={searchQuery} />
      </main>
    </div>
  );
}
