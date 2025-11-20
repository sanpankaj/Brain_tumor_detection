import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const Results = ({ result }) => {
  if (!result) return null;

  const { prediction, confidence, heatmap, probabilities } = result;

  // Determine color based on prediction
  const isNoTumor = prediction === 'No Tumor';
  const statusColor = isNoTumor ? 'text-green-400' : 'text-red-400';
  const StatusIcon = isNoTumor ? CheckCircle : AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Prediction Card */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-400" />
          Analysis Result
        </h3>
        
        <div className="flex flex-col items-center justify-center py-8">
          <StatusIcon className={`w-20 h-20 ${statusColor} mb-4`} />
          <h2 className={`text-3xl font-bold ${statusColor} mb-2`}>{prediction}</h2>
          <p className="text-slate-400">Confidence: <span className="text-white font-mono">{confidence}</span></p>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Probabilities</h4>
          {Object.entries(probabilities).map(([label, prob]) => (
            <div key={label} className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs font-semibold inline-block text-slate-300">
                  {label}
                </span>
                <span className="text-xs font-semibold inline-block text-slate-300">
                  {(prob * 100).toFixed(1)}%
                </span>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prob * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    label === prediction ? (isNoTumor ? 'bg-green-500' : 'bg-red-500') : 'bg-blue-500/30'
                  }`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Card */}
      <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <h3 className="text-xl font-semibold text-slate-300 mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-400" />
          Grad-CAM Visualization
        </h3>
        <div className="relative aspect-square bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
          {heatmap ? (
            <img
              src={`data:image/png;base64,${heatmap}`}
              alt="Grad-CAM Heatmap"
              className="w-full h-full object-contain"
            />
          ) : (
            <p className="text-slate-500">Heatmap not available</p>
          )}
        </div>
        <p className="mt-4 text-sm text-slate-400 text-center">
          Highlights regions of interest used by the model for classification.
        </p>
      </div>
    </motion.div>
  );
};

export default Results;
