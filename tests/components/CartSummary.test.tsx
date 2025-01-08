import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CartSummary from '@/components/cart/CartSummary';

// Mock useCart hook
vi.mock('@/hooks/useCart', () => ({
  useCart: () => ({
    items: [
      {
        id: '1',
        name: 'Test Product',
        price: 99.99,
        quantity: 2,
        image: 'test.jpg',
      },
    ],
    total: 199.98,
    updateQuantity: vi.fn(),
    removeFromCart: vi.fn(),
    clearCart: vi.fn(),
  }),
}));

// Mock useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

describe('CartSummary', () => {
  it('renders cart items and total', () => {
    render(<CartSummary />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$199.98')).toBeInTheDocument();
  });

  it('shows checkout button', () => {
    render(<CartSummary />);
    expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<CartSummary onClose={onClose} />);
    
    const closeButton = screen.getByRole('button', { name: /continue shopping/i });
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalled();
  });
});