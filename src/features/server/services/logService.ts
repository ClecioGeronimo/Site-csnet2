import { LogEntry } from '../types';

export async function fetchSystemLogs(
  filter: 'all' | 'info' | 'warning' | 'error' = 'all'
): Promise<LogEntry[]> {
  const response = await fetch(`/api/logs?filter=${filter}`);
  if (!response.ok) {
    throw new Error('Failed to fetch system logs');
  }
  return response.json();
}