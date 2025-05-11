import React from 'react';
import StoreComponent from '../components/Store';

function Store() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Nossa Loja
          </h1>
          <p className="text-xl text-white text-center mt-4">
            Equipamentos e acessórios para otimizar sua conexão
          </p>
        </div>
      </div>
      <StoreComponent />
    </div>
  );
}

export default Store;