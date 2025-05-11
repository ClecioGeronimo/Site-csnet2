import React from 'react';
import PlansComponent from '../components/Plans';
import SpeedTest from '../components/home/SpeedTest';

function Plans() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-orange-500 to-blue-600 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Nossos Planos
          </h1>
          <p className="text-xl text-white text-center mt-4">
            Escolha o plano perfeito para você
          </p>
        </div>
      </div>
      <PlansComponent />
      <SpeedTest />
    </div>
  );
}

export default Plans;