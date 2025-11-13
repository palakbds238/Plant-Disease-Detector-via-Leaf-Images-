import React, { useState, useEffect } from 'react';
import { getHistory, clearHistory } from '../services/historyService';
import { HistoryItem } from '../types';
import { HistoryIcon } from '../components/Icons';
import ResultCard from '../components/ResultCard';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire analysis history? This action cannot be undone.")) {
      clearHistory();
      setHistory([]);
      setSelectedItemId(null);
    }
  };

  const toggleItem = (id: number) => {
    setSelectedItemId(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-swoop-in-down">
        <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-green-900">Analysis History</h1>
            <p className="mt-2 text-base md:text-lg text-gray-600">Review your past plant diagnoses.</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Clear History
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-lg animate-fade-in">
          <div 
             className="relative inline-block"
             style={{
                backgroundImage: 'radial-gradient(circle, rgba(209,250,229,0.5) 0%, rgba(209,250,229,0) 60%)'
             }}
          >
            <HistoryIcon className="mx-auto h-16 w-16 text-gray-400 animate-pulse" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">No History Found</h2>
          <p className="mt-2 text-gray-500">Your past analyses will appear here once you diagnose a plant.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 stagger-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center p-4 text-left hover:bg-gray-50 focus:outline-none"
              >
                <img 
                  src={item.imageUrl} 
                  alt="Plant leaf analysis" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0" 
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-bold text-green-800">{item.result.diseaseName}</h3>
                  <p className="text-sm text-gray-500">{new Date(item.date).toLocaleString()}</p>
                </div>
                <svg
                    className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${selectedItemId === item.id ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedItemId === item.id && (
                <div className="p-4 border-t border-gray-200">
                   <ResultCard result={item.result} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;