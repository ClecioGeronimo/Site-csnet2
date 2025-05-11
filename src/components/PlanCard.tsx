import React from 'react';
import { Check } from 'lucide-react';

interface PlanCardProps {
  name: string;
  speed: string;
  price: string;
  features: string[];
  popular?: boolean;
}

function PlanCard({ name, speed, price, features, popular = false }: PlanCardProps) {
  return (
    <div className={`rounded-2xl p-8 ${popular ? 'bg-blue-600 text-white ring-4 ring-blue-500' : 'bg-gray-50'}`}>
      {popular && (
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Mais Popular
        </span>
      )}
      <h3 className={`text-2xl font-bold mt-4 ${popular ? 'text-white' : 'text-gray-800'}`}>{name}</h3>
      <div className="mt-4">
        <span className={`text-4xl font-bold ${popular ? 'text-white' : 'text-gray-800'}`}>{speed}</span>
        <span className={`text-xl ${popular ? 'text-white/90' : 'text-gray-600'}`}>MEGA</span>
      </div>
      <div className="mt-4">
        <span className={`text-sm ${popular ? 'text-white/90' : 'text-gray-600'}`}>R$</span>
        <span className={`text-4xl font-bold ${popular ? 'text-white' : 'text-gray-800'}`}>{price}</span>
        <span className={`text-sm ${popular ? 'text-white/90' : 'text-gray-600'}`}>/mês</span>
      </div>
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className={`w-5 h-5 ${popular ? 'text-white' : 'text-orange-500'}`} />
            <span className={popular ? 'text-white/90' : 'text-gray-600'}>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-all ${
          popular
            ? 'bg-white text-blue-600 hover:bg-gray-100'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
      >
        Assinar Agora
      </button>
    </div>
  );
}

export default PlanCard;