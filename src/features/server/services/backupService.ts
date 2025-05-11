import { BackupConfig } from '../types';

export async function fetchBackups(): Promise<BackupConfig[]> {
  const response = await fetch('/api/backups');
  if (!response.ok) {
    throw new Error('Failed to fetch backups');
  }
  return response.json();
}

export async function createBackup(): Promise<void> {
  const response = await fetch('/api/backups', {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to create backup');
  }
}