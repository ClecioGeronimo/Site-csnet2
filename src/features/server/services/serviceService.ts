import { Service } from '../types';

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch('/api/services');
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
}

export async function controlService(
  serviceName: string,
  action: 'start' | 'stop' | 'restart'
): Promise<void> {
  const response = await fetch(`/api/services/${serviceName}/${action}`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error(`Failed to ${action} service ${serviceName}`);
  }
}