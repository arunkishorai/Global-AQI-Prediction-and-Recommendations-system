
import React from 'react';
import type { ForecastDay } from '../types';
import { getAqiLevel, AQI_LEVELS } from '../constants';
import { CalendarIcon } from './icons';

interface ForecastProps {
  forecast: ForecastDay[];
}

export const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
      <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2"><CalendarIcon className="h-5 w-5"/>5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day) => {
          const level = getAqiLevel(day.aqi);
          const levelInfo = AQI_LEVELS[level];
          return (
            <div key={day.day} className="flex items-center justify-between bg-slate-700/30 p-3 rounded-lg">
              <span className="font-medium text-slate-300 w-12">{day.day}</span>
              <div className="flex-1 mx-4 h-2 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className={`${levelInfo.color} h-full rounded-full`} 
                  style={{ width: `${Math.min((day.aqi / 200) * 100, 100)}%` }}
                ></div>
              </div>
              <span className={`font-semibold w-10 text-right ${levelInfo.textColor}`}>{day.aqi}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
