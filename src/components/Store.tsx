import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart, Star, Search, Filter, X } from 'lucide-react';
import CartModal from './CartModal';

// Extract products data
const products = [
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

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'routers', name: 'Roteadores' },
  { id: 'networking', name: 'Rede' },
  { id: 'accessories', name: 'Acessórios' }
];

// Optimize ProductCard with memo
const ProductCard = React.memo(({ product, onAddToCart, inCart }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [onAddToCart, product]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < product.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-800">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              inCart ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? 'Adicionar mais' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
});

function Store() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  }, [removeFromCart]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Loja CSNET PRO LINK</h1>
            <p className="text-gray-600 text-lg">
              Equipamentos de qualidade para otimizar sua conexão
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
              inCart={cartItems.some(item => item.id === product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto encontrado.</p>
          </div>
        )}

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      </div>
    </div>
  );
}

export default Store;