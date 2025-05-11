import React, { useEffect, useState } from 'react';
import { Plan } from '../types/database';
import { getPlans } from '../lib/api';
import PlanCard from './PlanCard';

function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        setError('Failed to load plans. Please try again later.');
        console.error('Error loading plans:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">Loading plans...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white" id="planos">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Nossos Planos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              name={plan.name}
              speed={plan.speed.toString()}
              price={plan.price.toFixed(2).replace('.', ',')}
              features={JSON.parse(plan.features)}
              popular={plan.is_popular}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Plans;