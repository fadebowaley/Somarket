import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '@/components/products/ProductList';
import { products } from '@/lib/data/products';

// Mock useCart hook
vi.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    addToCart: vi.fn(),
  }),
}));

// Mock useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('ProductList', () => {
  it('renders all products', () => {
    render(<ProductList />);
    
    products.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  it('shows add to cart button for each product', () => {
    render(<ProductList />);
    const addToCartButtons = screen.getAllByText('Add to Cart');
    expect(addToCartButtons).toHaveLength(products.length);
  });
});