import React, { useState, useEffect } from 'react';
import { fetchHistory, API_URL } from '../api';
import { Calendar, Activity, AlertCircle, CheckCircle } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError("Failed to load history.");
      } finally {
        setIsLoading(false);
      }
    };
    loadHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 inline-block text-red-400">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center">
        <Calendar className="mr-3 text-blue-400" />
        Scan History
      </h1>

      {history.length === 0 ? (
        <div className="text-center text-slate-500 py-12 bg-slate-800/50 rounded-xl border border-slate-700">
          <p>No scan history found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => {
            const isNoTumor = item.prediction === 'No Tumor';
            const statusColor = isNoTumor ? 'text-green-400' : 'text-red-400';
            const StatusIcon = isNoTumor ? CheckCircle : AlertCircle;

            return (
              <div key={item.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-colors group">
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img 
                    src={`${API_URL}/uploads/${item.filename}`} 
                    alt="Scan" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-300 font-mono">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StatusIcon className={`w-4 h-4 mr-2 ${statusColor}`} />
                      <span className={`font-bold ${statusColor}`}>{item.prediction}</span>
                    </div>
                    <span className="text-slate-400 text-sm">
                      {(item.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isNoTumor ? 'bg-green-500' : 'bg-red-500'}`} 
                      style={{ width: `${item.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
