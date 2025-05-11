import React, { useState, useEffect } from 'react';
import { Play, Square, RefreshCw } from 'lucide-react';
import { Service } from '../../types';
import { fetchServices, controlService } from '../../services/serviceService';
import ServiceItem from './components/ServiceItem';

function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceAction = async (serviceName: string, action: 'start' | 'stop' | 'restart') => {
    try {
      await controlService(serviceName, action);
      await loadServices();
    } catch (error) {
      console.error(`Failed to ${action} service:`, error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">System Services</h2>
        <button
          onClick={loadServices}
          className="p-2 hover:bg-gray-100 rounded-lg"
          disabled={isLoading}
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <ServiceItem
            key={service.name}
            service={service}
            onAction={handleServiceAction}
          />
        ))}
      </div>
    </div>
  );
}

export default ServiceManager;