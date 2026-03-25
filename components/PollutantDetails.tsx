
import React from 'react';
import type { Pollutant } from '../types';

interface PollutantDetailsProps {
  pollutants: Pollutant[];
}

const getLevelColor = (level: Pollutant['level']) => {
  switch (level) {
    case 'Good': return 'bg-green-500/20 text-green-300';
    case 'Moderate': return 'bg-yellow-500/20 text-yellow-300';
    case 'Unhealthy': return 'bg-red-500/20 text-red-300';
    default: return 'bg-slate-600/20 text-slate-300';
  }
};

export const PollutantDetails: React.FC<PollutantDetailsProps> = ({ pollutants }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
      <h3 className="text-lg font-semibold text-slate-300 mb-4">Pollutant Details</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {pollutants.map((pollutant) => (
          <div key={pollutant.name} className="bg-slate-700/30 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <div className="text-xl font-bold text-slate-200" dangerouslySetInnerHTML={{ __html: pollutant.symbol }} />
            <p className="text-xs text-slate-400 mt-1">{pollutant.name}</p>
            <p className="text-lg font-semibold text-slate-100 mt-2">{pollutant.value}</p>
            <p className="text-xs text-slate-500">{pollutant.unit}</p>
            <span className={`mt-3 px-2 py-0.5 text-xs font-medium rounded-full ${getLevelColor(pollutant.level)}`}>
              {pollutant.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
