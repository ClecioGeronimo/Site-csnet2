export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: number;
  name: string;
  speed: number;
  price: number;
  features: string;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customer_id: number;
  plan_id: number;
  status: 'pending' | 'active' | 'cancelled';
  installation_date: string | null;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  plan_name?: string;
  plan_speed?: number;
  plan_price?: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: string;
  created_at: string;
  updated_at: string;
}