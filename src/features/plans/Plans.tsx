import React from 'react';
import { Check } from 'lucide-react';
import PlanCard from './components/PlanCard';

function Plans() {
  return (
    <div className="py-20 bg-white" id="planos">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Nossos Planos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PlanCard
            name="Básico"
            speed="60"
            price="59,90"
            features={[
              'Download 60 Mega',
              'Upload 30 Mega',
              'Wi-Fi Grátis',
              'Instalação Grátis'
            ]}
          />
          <PlanCard
            name="Família"
            speed="200"
            price="69,90"
            popular={true}
            features={[
              'Download 200 Mega',
              'Upload 80 Mega',
              'Wi-Fi Grátis',
              'Instalação Grátis',
              'Suporte Prioritário'
            ]}
          />
          <PlanCard
            name="Gamer"
            speed="300"
            price="99,90"
            features={[
              'Download 300 Mega',
              'Upload 100 Mega',
              'Wi-Fi Grátis',
              'Instalação Grátis',
              'Suporte VIP 24/7',
              'IP Fixo'
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Plans;