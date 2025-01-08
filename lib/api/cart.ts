import api from './client';
import { CartItem } from '@/lib/types';

export async function getCart(): Promise<CartItem[]> {
  const response = await api.get('/cart');
  return response.data;
}

export async function addToCart(productId: string, quantity: number) {
  const response = await api.post('/cart/add', { productId, quantity });
  return response.data;
}

export async function updateCartItem(productId: string, quantity: number) {
  const response = await api.post('/cart/update', { productId, quantity });
  return response.data;
}

export async function clearCart() {
  const response = await api.post('/cart/clear');
  return response.data;
}