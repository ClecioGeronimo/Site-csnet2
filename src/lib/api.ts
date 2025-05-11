import { Plan, Customer, Order, Product } from '../types/database';

const API_BASE_URL = '/api';

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function getPlans(): Promise<Plan[]> {
  // Return mock data for now until backend API is ready
  return [
    {
      id: 1,
      name: "Básico",
      speed: 60,
      price: 59.90,
      features: JSON.stringify([
        'Download 60 Mega',
        'Upload 30 Mega',
        'Wi-Fi Grátis',
        'Instalação Grátis'
      ]),
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Família",
      speed: 200,
      price: 69.90,
      features: JSON.stringify([
        'Download 200 Mega',
        'Upload 80 Mega',
        'Wi-Fi Grátis',
        'Instalação Grátis',
        'Suporte Prioritário'
      ]),
      is_popular: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      name: "Gamer",
      speed: 300,
      price: 99.90,
      features: JSON.stringify([
        'Download 300 Mega',
        'Upload 100 Mega',
        'Wi-Fi Grátis',
        'Instalação Grátis',
        'Suporte VIP 24/7',
        'IP Fixo'
      ]),
      is_popular: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
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