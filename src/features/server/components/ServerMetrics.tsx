import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ServerStatus } from '../types';

function ServerMetrics() {
  const [metrics, setMetrics] = useState<ServerStatus[]>([]);
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('1h');

  useEffect(() => {
    // In a real app, this would fetch from your server API
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timeRange]);

  const chartData = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Usage',
        data: metrics.map(m => m.cpu.usage),
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      {
        label: 'Memory Usage',
        data: metrics.map(m => (m.memory.used / m.memory.total) * 100),
        borderColor: 'rgb(16, 185, 129)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">System Metrics</h2>
        <div className="flex gap-2">
          {(['1h', '24h', '7d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: value => `${value}%`
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default ServerMetrics;