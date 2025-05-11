import React from 'react';
import { Wifi, Shield, Clock, Headphones } from 'lucide-react';

function Features() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Por que escolher a CSNET PRO LINK?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Wifi className="w-8 h-8 text-orange-500" />}
            title="Internet Fibra"
            description="Conexão 100% fibra óptica para máxima velocidade e estabilidade"
          />
          
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-orange-500" />}
            title="Conexão Segura"
            description="Proteção avançada contra ameaças online"
          />
          
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-orange-500" />}
            title="Suporte 24/7"
            description="Assistência técnica disponível 24 horas por dia"
          />
          
          <FeatureCard
            icon={<Headphones className="w-8 h-8 text-orange-500" />}
            title="Atendimento Premium"
            description="Equipe especializada para melhor atendimento"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Features;