import React, { useState, useEffect } from 'react';
import { AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { LogEntry } from '../types';

function SystemLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/logs');
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(
    log => filter === 'all' || log.level === filter
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">System Logs</h2>
        <div className="flex gap-2">
          {(['all', 'info', 'warning', 'error'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                filter === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredLogs.map((log, index) => (
          <LogEntry key={index} log={log} />
        ))}
      </div>
    </div>
  );
}

function LogEntry({ log }: { log: LogEntry }) {
  const icons = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />
  };

  const backgrounds = {
    info: 'bg-blue-50',
    warning: 'bg-yellow-50',
    error: 'bg-red-50'
  };

  return (
    <div className={`p-3 rounded-lg ${backgrounds[log.level]}`}>
      <div className="flex items-start gap-3">
        {icons[log.level]}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{log.message}</p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span>{new Date(log.timestamp).toLocaleString()}</span>
            <span>•</span>
            <span>{log.service}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemLogs;