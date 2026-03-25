
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { CountryAqiData } from '../types';
import { getAqiLevel, AQI_LEVELS } from '../constants';

interface CountryComparisonChartProps {
  data: CountryAqiData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const level = getAqiLevel(data.aqi);
    const levelInfo = AQI_LEVELS[level];

    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-3 rounded-lg border border-slate-600">
        <p className="font-bold text-slate-200">{label}</p>
        <p className={`font-semibold ${levelInfo.textColor}`}>AQI: {data.aqi}</p>
        <p className="text-sm text-slate-300">Level: {level}</p>
      </div>
    );
  }
  return null;
};


export const CountryComparisonChart: React.FC<CountryComparisonChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
        barSize={30}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="country" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} domain={[0, 'dataMax + 50']} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(71, 85, 105, 0.3)' }}/>
        <Bar dataKey="aqi">
            {data.map((entry, index) => {
                const level = getAqiLevel(entry.aqi);
                const levelInfo = AQI_LEVELS[level];
                return <Cell key={`cell-${index}`} fill={levelInfo.mapColor} />;
            })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};