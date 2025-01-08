import api from './client';
import { Product } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
  const response = await api.get('/products');
  return response.data;
}

export async function addProduct(product: Omit<Product, 'id'>) {
  const response = await api.post('/products', product);
  return response.data;
}