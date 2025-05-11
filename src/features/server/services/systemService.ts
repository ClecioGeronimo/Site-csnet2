import { ServerStatus } from '../types';

export async function fetchSystemMetrics(timeRange: '1h' | '24h' | '7d'): Promise<ServerStatus[]> {
  const response = await fetch(`/api/system/metrics?range=${timeRange}`);
  if (!response.ok) {
    throw new Error('Failed to fetch system metrics');
  }
  return response.json();
}

export async function fetchSystemInfo(): Promise<ServerStatus> {
  const response = await fetch('/api/system/info');
  if (!response.ok) {
    throw new Error('Failed to fetch system info');
  }
  return response.json();
}