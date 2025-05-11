import React, { useState, useEffect } from 'react';
import { Play, Square, RefreshCw, AlertTriangle } from 'lucide-react';
import { Service } from '../types';

function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceAction = async (serviceName: string, action: 'start' | 'stop' | 'restart') => {
    try {
      await fetch(`/api/services/${serviceName}/${action}`, { method: 'POST' });
      await fetchServices();
    } catch (error) {
      console.error(`Failed to ${action} service:`, error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">System Services</h2>
        <button
          onClick={fetchServices}
          className="p-2 hover:bg-gray-100 rounded-lg"
          disabled={isLoading}
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="flex items-center gap-2">
                <StatusIndicator status={service.status} />
                <h3 className="font-medium text-gray-900">{service.name}</h3>
              </div>
              {service.pid && (
                <p className="text-sm text-gray-500 mt-1">
                  PID: {service.pid} | Memory: {formatBytes(service.memory_usage || 0)} | 
                  CPU: {service.cpu_usage?.toFixed(1)}%
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <ActionButton
                onClick={() => handleServiceAction(service.name, 'start')}
                disabled={service.status === 'running'}
                icon={<Play className="w-4 h-4" />}
                label="Start"
              />
              <ActionButton
                onClick={() => handleServiceAction(service.name, 'stop')}
                disabled={service.status === 'stopped'}
                icon={<Square className="w-4 h-4" />}
                label="Stop"
              />
              <ActionButton
                onClick={() => handleServiceAction(service.name, 'restart')}
                icon={<RefreshCw className="w-4 h-4" />}
                label="Restart"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusIndicator({ status }: { status: Service['status'] }) {
  const colors = {
    running: 'bg-green-500',
    stopped: 'bg-gray-500',
    error: 'bg-red-500'
  };

  return (
    <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
  );
}

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ onClick, disabled, icon, label }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg flex items-center gap-1 text-sm ${
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      title={label}
    >
      {icon}
    </button>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default ServicesList;