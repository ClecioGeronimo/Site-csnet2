import React from 'react';
import { ArrowRight, Wifi } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-blue-600 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          alt="Internet Technology Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Wifi className="w-8 h-8 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-orange-500">CSNET</span>
              <span className="text-blue-600">PRO LINK</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Conectando o Conde-PB com internet de alta velocidade e qualidade superior
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors text-lg font-semibold"
            >
              Ver Planos
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Internet Fibra</h3>
              <p className="text-gray-200">Conexão estável e ultra velocidade para sua casa</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-gray-200">Assistência técnica sempre que precisar</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-2">Instalação Grátis</h3>
              <p className="text-gray-200">Instalação e configuração sem custos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;