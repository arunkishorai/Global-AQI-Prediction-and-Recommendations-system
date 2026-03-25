
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface LocationSelectorProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationChange }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onLocationChange(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center max-w-sm mx-auto">
      <div className="relative flex-grow">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a city or zip code..."
          className="w-full bg-slate-800/70 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
      </div>
      <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900">
        Search
      </button>
    </form>
  );
};
