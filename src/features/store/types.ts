export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem extends Product {
  quantity: number;
}