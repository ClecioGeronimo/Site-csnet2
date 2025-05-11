// Centralize all types
export interface Plan {
  id: number;
  name: string;
  speed: number;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}