import { Plan, Customer, Order, Product } from '../types/database';

const API_URL = (window as any).wpCsnetData?.apiUrl || '/wp-json/wp_csnet/v1';

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': (window as any).wpCsnetData?.nonce,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function getPlans(): Promise<Plan[]> {
  return fetchAPI<Plan[]>('/plans');
}

export async function getCustomers(): Promise<Customer[]> {
  return fetchAPI<Customer[]>('/customers');
}

export async function getOrders(): Promise<Order[]> {
  return fetchAPI<Order[]>('/orders');
}

export async function createOrder(orderData: Partial<Order>): Promise<Order> {
  return fetchAPI<Order>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrderById(id: number): Promise<Order> {
  return fetchAPI<Order>(`/orders/${id}`);
}

export default {
  getPlans,
  getCustomers,
  getOrders,
  createOrder,
  getOrderById,
};