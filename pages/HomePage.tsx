
import React from 'react';
import type { AirQualityData } from '../types';
import { LocationSelector } from '../components/LocationSelector';
import { Dashboard } from '../components/Dashboard';

interface HomePageProps {
    location: string;
    onLocationChange: (newLocation: string) => void;
    airQualityData: AirQualityData | null;
    isLoading: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
    location,
    onLocationChange,
    airQualityData,
    isLoading
}) => {
    return (
        <>
            <LocationSelector location={location} onLocationChange={onLocationChange} />
            
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
                </div>
            ) : airQualityData ? (
                <div className="mt-6">
                    <Dashboard data={airQualityData} />
                </div>
            ) : (
                <div className="text-center mt-10 text-slate-500">Could not load air quality data.</div>
            )}
        </>
    );
};
