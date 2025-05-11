export interface ServerStatus {
  cpu: {
    usage: number;
    temperature: number;
    cores: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
  };
  network: {
    rx_bytes: number;
    tx_bytes: number;
    interfaces: string[];
  };
  uptime: number;
}

export interface Service {
  name: string;
  status: 'running' | 'stopped' | 'error';
  pid?: number;
  memory_usage?: number;
  cpu_usage?: number;
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  service: string;
}

export interface BackupConfig {
  id: string;
  name: string;
  source: string;
  destination: string;
  schedule: string;
  retention: number;
  lastBackup?: string;
  status: 'success' | 'failed' | 'pending';
}