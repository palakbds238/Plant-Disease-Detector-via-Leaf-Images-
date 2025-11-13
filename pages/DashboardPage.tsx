import React, { useState, useEffect, useMemo } from 'react';
import { getHistory } from '../services/historyService';
import { HistoryItem } from '../types';
import { LeafIcon, AlertTriangleIcon, ChartBarIcon } from '../components/Icons';
import StatCard from '../components/StatCard';
import DiseaseChart from '../components/DiseaseChart';

interface DashboardPageProps {
  setPage: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ setPage }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const stats = useMemo(() => {
    const totalAnalyses = history.length;
    const healthyPlants = history.filter(item => item.result.diseaseName.toLowerCase() === 'healthy').length;
    const diseasesDetected = totalAnalyses - healthyPlants;
    
    const diseaseCounts = history
      .filter(item => item.result.diseaseName.toLowerCase() !== 'healthy' && item.result.isPlant)
      .reduce((acc, item) => {
        acc[item.result.diseaseName] = (acc[item.result.diseaseName] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalAnalyses,
      healthyPlants,
      diseasesDetected,
      diseaseCounts,
    };
  }, [history]);

  if (history.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-lg shadow-lg animate-fade-in max-w-2xl mx-auto">
        <ChartBarIcon className="mx-auto h-16 w-16 text-gray-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-700">Your Dashboard Awaits</h2>
        <p className="mt-2 text-gray-500">Analyze a plant leaf to see your stats here!</p>
        <button
          onClick={() => setPage('home')}
          className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Start First Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center animate-swoop-in-down">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900">Dashboard</h1>
        <p className="mt-3 text-base md:text-lg text-gray-600">Your plant health at a glance.</p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stagger-fade-in" style={{ animationDelay: '100ms' }}>
          <StatCard title="Total Analyses" value={stats.totalAnalyses} icon={<ChartBarIcon />} color="blue" />
        </div>
        <div className="stagger-fade-in" style={{ animationDelay: '200ms' }}>
          <StatCard title="Healthy Plants" value={stats.healthyPlants} icon={<LeafIcon />} color="green" />
        </div>
        <div className="stagger-fade-in" style={{ animationDelay: '300ms' }}>
          <StatCard title="Diseases Detected" value={stats.diseasesDetected} icon={<AlertTriangleIcon />} color="yellow" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Disease Breakdown */}
        <div className="lg:col-span-2 stagger-fade-in" style={{ animationDelay: '400ms' }}>
            <DiseaseChart data={stats.diseaseCounts} />
        </div>

        {/* Recent Activity */}
        <div className="stagger-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {history.slice(0, 4).map(item => (
                        <div key={item.id} className="flex items-center gap-4">
                            <img src={item.imageUrl} alt={item.result.diseaseName} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <p className="font-semibold text-gray-700">{item.result.diseaseName}</p>
                                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                     {history.length === 0 && <p className="text-sm text-gray-500">No recent activity.</p>}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
