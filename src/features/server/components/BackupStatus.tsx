import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { BackupConfig } from '../types';

function BackupStatus() {
  const [backups, setBackups] = useState<BackupConfig[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await fetch('/api/backups');
      const data = await response.json();
      setBackups(data);
    } catch (error) {
      console.error('Failed to fetch backups:', error);
    }
  };

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      await fetch('/api/backups', { method: 'POST' });
      await fetchBackups();
    } catch (error) {
      console.error('Failed to create backup:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Backup Status</h2>
        <button
          onClick={handleCreateBackup}
          disabled={isCreating}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
            isCreating
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isCreating ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Calendar className="w-4 h-4" />
          )}
          Create Backup
        </button>
      </div>

      <div className="space-y-4">
        {backups.map((backup) => (
          <div
            key={backup.id}
            className="p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{backup.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {backup.source} → {backup.destination}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {backup.schedule}
                  </span>
                  <span className="text-gray-600">
                    Retention: {backup.retention} days
                  </span>
                </div>
              </div>
              <StatusBadge status={backup.status} />
            </div>
            
            {backup.lastBackup && (
              <p className="text-sm text-gray-500 mt-2">
                Last backup: {new Date(backup.lastBackup).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: BackupConfig['status'] }) {
  const config = {
    success: {
      icon: CheckCircle,
      text: 'Success',
      className: 'bg-green-100 text-green-700'
    },
    failed: {
      icon: XCircle,
      text: 'Failed',
      className: 'bg-red-100 text-red-700'
    },
    pending: {
      icon: Clock,
      text: 'Pending',
      className: 'bg-yellow-100 text-yellow-700'
    }
  }[status];

  const Icon = config.icon;

  return (
    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium ${config.className}`}>
      <Icon className="w-4 h-4" />
      {config.text}
    </span>
  );
}

export default BackupStatus;