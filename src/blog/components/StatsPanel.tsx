// src/blog/components/StatsPanel.tsx
import { useState, useEffect } from 'react'; 
import { getStats } from '../utils/metrics';
import { getQueueSize, syncQueue } from '../utils/offlineQueue';

interface Stats {
  success: number;
  failed: number;
  avgLatency: string;
  queueSize: number;
}

const StatsPanel = () => {
  const [stats, setStats] = useState<Stats>({
    success: 0,
    failed: 0,
    avgLatency: '0.00 ms',
    queueSize: 0,
  });

  const updateStats = () => {
    const currentStats = getStats();
    const currentQueueSize = getQueueSize();
    setStats({
      ...currentStats,
      queueSize: currentQueueSize,
    });
  };

  useEffect(() => {
    updateStats(); 


    window.addEventListener('metricsUpdate', updateStats); 
    

    window.addEventListener('queueUpdate', updateStats); 
    

    window.addEventListener('online', updateStats); 
    
    return () => {

      window.removeEventListener('metricsUpdate', updateStats);
      window.removeEventListener('queueUpdate', updateStats);
      window.removeEventListener('online', updateStats);
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">Observabilidad (Cliente)</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center bg-green-50 p-2 rounded">
          <span className="font-medium">Envíos OK:</span>
          <span className="font-bold text-green-700">{stats.success}</span>
        </div>
        
        <div className="flex justify-between items-center bg-red-50 p-2 rounded">
          <span className="font-medium">Envíos Fallidos:</span>
          <span className="font-bold text-red-700">{stats.failed}</span>
        </div>

        <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
          <span className="font-medium">Latencia Promedio:</span>
          <span className="font-bold text-blue-700">{stats.avgLatency}</span>
        </div>

        <div className="flex justify-between items-center bg-yellow-100 p-2 rounded border border-yellow-400">
          <span className="font-medium">⏳ En Cola Offline:</span>
          <span className="font-bold text-yellow-700 text-lg">{stats.queueSize}</span>
        </div>
      </div>
      
      {stats.queueSize > 0 && (
        <button
          onClick={syncQueue} 
          className="w-full mt-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded text-sm font-medium transition duration-150"
        >
          Forzar Sincronización
        </button>
      )}
    </div>
  );
};

export default StatsPanel;