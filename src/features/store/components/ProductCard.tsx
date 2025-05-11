import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  inCart: boolean;
}

const ProductCard = React.memo(({ product, onAddToCart, inCart }: ProductCardProps) => {
  const handleAddToCart = React.useCallback(() => {
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
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              inCart ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {inCart ? 'Adicionar mais' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;