import React from 'react';
import { CpuIcon, HardDrive, Memory, Activity, Clock, Server } from 'lucide-react';
import ServerMetrics from './ServerMetrics';
import ServicesList from './ServicesList';
import SystemLogs from './SystemLogs';
import BackupStatus from './BackupStatus';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Server Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your Linux server</p>
        </div>

        {/* Server Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<CpuIcon className="w-6 h-6" />}
            title="CPU Usage"
            value="32%"
            trend="+2.5%"
            trendType="up"
          />
          <MetricCard
            icon={<Memory className="w-6 h-6" />}
            title="Memory Usage"
            value="4.2GB"
            trend="70%"
            trendType="stable"
          />
          <MetricCard
            icon={<HardDrive className="w-6 h-6" />}
            title="Disk Space"
            value="234GB"
            trend="85%"
            trendType="down"
          />
          <MetricCard
            icon={<Clock className="w-6 h-6" />}
            title="Uptime"
            value="45 days"
            trend="99.9%"
            trendType="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Server Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <ServerMetrics />
          </div>

          {/* Services List */}
          <div className="bg-white rounded-lg shadow p-6">
            <ServicesList />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* System Logs */}
          <div className="bg-white rounded-lg shadow p-6">
            <SystemLogs />
          </div>

          {/* Backup Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <BackupStatus />
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down' | 'stable';
}

function MetricCard({ icon, title, value, trend, trendType }: MetricCardProps) {
  const trendColor = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-blue-500'
  }[trendType];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-50 rounded-lg">
          {React.cloneElement(icon as React.ReactElement, {
            className: 'w-6 h-6 text-blue-500'
          })}
        </div>
        <span className={`text-sm font-medium ${trendColor}`}>{trend}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mt-4">{title}</h3>
      <p className="text-2xl font-semibold text-gray-700 mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;