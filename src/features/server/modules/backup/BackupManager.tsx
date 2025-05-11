import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { BackupConfig } from '../../types';
import { fetchBackups, createBackup } from '../../services/backupService';
import BackupItem from './components/BackupItem';

function BackupManager() {
  const [backups, setBackups] = useState<BackupConfig[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadBackups();
  }, []);

  const loadBackups = async () => {
    try {
      const data = await fetchBackups();
      setBackups(data);
    } catch (error) {
      console.error('Failed to fetch backups:', error);
    }
  };

  const handleCreateBackup = async () => {
    setIsCreating(true);
    try {
      await createBackup();
      await loadBackups();
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
          <BackupItem key={backup.id} backup={backup} />
        ))}
      </div>
    </div>
  );
}

export default BackupManager;