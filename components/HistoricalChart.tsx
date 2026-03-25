
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { HistoricalDataPoint } from '../types';
import { ChartBarIcon } from './icons';

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
      <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2"><ChartBarIcon className="h-5 w-5" />Historical AQI (30 days)</h3>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <defs>
                <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} domain={[0, 'dataMax + 20']} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                borderColor: '#475569',
                color: '#e2e8f0',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#cbd5e1', fontWeight: 'bold' }}
              itemStyle={{ color: '#67e8f9' }}
            />
            <Area type="monotone" dataKey="aqi" stroke="#22d3ee" fill="url(#colorAqi)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
