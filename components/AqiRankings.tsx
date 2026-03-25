
import React from 'react';
import type { AqiRankingItem } from '../types';
import { AQI_LEVELS } from '../constants';

interface AqiRankingsProps {
    rankings: AqiRankingItem[];
}

export const AqiRankings: React.FC<AqiRankingsProps> = ({ rankings }) => {
    return (
        <div className="bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Rank</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">City</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">AQI</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Level</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-800/50 divide-y divide-slate-700/50">
                        {rankings.map((item, index) => {
                            const levelInfo = AQI_LEVELS[item.level];
                            return (
                                <tr key={item.location} className="hover:bg-slate-700/40 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-300">#{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="font-semibold text-slate-100">{item.location}</div>
                                        <div className="text-slate-400">{item.country}</div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${levelInfo.textColor}`}>{item.aqi}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${levelInfo.color} bg-opacity-30 ${levelInfo.textColor}`}>
                                            {item.level}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
