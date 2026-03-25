
import React, { useState, useEffect } from 'react';
import { getMockRankingsData } from '../services/airQualityService';
import type { AqiRankingItem } from '../types';
import { AqiRankings } from '../components/AqiRankings';

export const AqiDetailsPage: React.FC = () => {
    const [rankings, setRankings] = useState<AqiRankingItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setRankings(getMockRankingsData());
            setIsLoading(false);
        }, 500);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Global AQI Rankings</h2>
            <p className="text-slate-400">
                Discover the current air quality situation in major cities around the world. The list is sorted by the highest AQI value, showing the most polluted areas first.
            </p>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-cyan-400"></div>
                </div>
            ) : (
                <AqiRankings rankings={rankings} />
            )}
        </div>
    );
};
