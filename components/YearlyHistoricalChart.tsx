
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { YearlyAqiData } from '../types';

interface YearlyHistoricalChartProps {
  data: YearlyAqiData[];
}

export const YearlyHistoricalChart: React.FC<YearlyHistoricalChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
            <linearGradient id="colorYearlyAqi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={{ stroke: '#94a3b8' }} domain={['dataMin - 20', 'dataMax + 20']} />
        <Tooltip
            contentStyle={{
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            borderColor: '#475569',
            color: '#e2e8f0',
            borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#cbd5e1', fontWeight: 'bold' }}
            itemStyle={{ color: '#67e8f9' }}
            formatter={(value: number) => [value, 'Avg. AQI']}
        />
        <Area type="monotone" dataKey="aqi" stroke="#22d3ee" fill="url(#colorYearlyAqi)" strokeWidth={2} />
        </AreaChart>
    </ResponsiveContainer>
  );
};