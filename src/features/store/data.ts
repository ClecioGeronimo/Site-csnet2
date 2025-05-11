import { Product, Category } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Roteador Wi-Fi 6 Dual Band',
    price: 299.90,
    rating: 5,
    category: 'routers',
    image: 'https://images.unsplash.com/photo-1648412814506-fb21dfa01248?auto=format&fit=crop&q=80&w=400',
    description: 'Roteador dual band com tecnologia Wi-Fi 6 para máxima performance',
    features: ['Wi-Fi 6', 'Dual Band', '4 antenas', 'Gigabit']
  },
  {
    id: 2,
    name: 'Repetidor Wi-Fi Mesh',
    price: 149.90,
    rating: 4,
    category: 'routers',
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&q=80&w=400',
    description: 'Sistema Mesh para cobertura total da sua casa',
    features: ['Mesh', 'Dual Band', 'Fácil configuração']
  },
  {
    id: 3,
    name: 'Cabo de Rede Cat6 15m',
    price: 79.90,
    rating: 5,
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1600305877011-f453b9621e48?auto=format&fit=crop&q=80&w=400',
    description: 'Cabo de rede categoria 6 de alta performance',
    features: ['Cat6', '15 metros', 'Blindado']
  },
  {
    id: 4,
    name: 'Switch 8 Portas Gigabit',
    price: 199.90,
    rating: 4,
    category: 'networking',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80&w=400',
    description: 'Switch gigabit 8 portas para expansão de rede',
    features: ['8 portas', 'Gigabit', 'Plug & Play']
  },
  {
    id: 5,
    name: 'Kit Ferramentas de Rede',
    price: 129.90,
    rating: 5,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
    description: 'Kit completo de ferramentas para instalação de rede',
    features: ['Alicate', 'Testador', 'Conectores']
  },
  {
    id: 6,
    name: 'Antena Wi-Fi USB',
    price: 89.90,
    rating: 4,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=400',
    description: 'Adaptador Wi-Fi USB de alto ganho',
    features: ['USB 3.0', 'Dual Band', 'Alto ganho']
  }
];

export const categories: Category[] = [
  { id: 'all', name: 'Todos' },
  { id: 'routers', name: 'Roteadores' },
  { id: 'networking', name: 'Rede' },
  { id: 'accessories', name: 'Acessórios' }
];