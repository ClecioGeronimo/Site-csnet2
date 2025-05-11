import React from 'react';
import { CheckCircle } from 'lucide-react';

function Coverage() {
  const areas = [
    'Centro - Conde',
    'Área Rural - Santa Rita'
  ];

  return (
    <div className="py-20 bg-gray-50" id="cobertura">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Área de Cobertura
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Levamos internet de alta velocidade para o Centro de Conde-PB e Área Rural de Santa Rita-PB. 
            Entre em contato conosco para verificar a disponibilidade em seu endereço.
          </p>
          
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
            {areas.map((area, index) => (
              <div key={index} className="flex items-center gap-3 text-lg">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-gray-700">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coverage;