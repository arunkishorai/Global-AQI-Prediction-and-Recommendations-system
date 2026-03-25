
import React, { useState, useMemo, useEffect } from 'react';
import { getMockCountryComparisonData, getMockYearlyHistoricalData, CITIES } from '../services/airQualityService';
import type { CountryAqiData, YearlyAqiData } from '../types';
import { CountryComparisonChart } from '../components/CountryComparisonChart';
import { YearlyHistoricalChart } from '../components/YearlyHistoricalChart';
import { GlobeAmericasIcon, ChartBarIcon } from '../components/icons';

const uniqueCountries = [...new Set(CITIES.map(c => c.country))].sort();

export const ComparisonPage: React.FC = () => {
    const [selectedCountries, setSelectedCountries] = useState<string[]>(['USA', 'China', 'India', 'UK', 'Australia']);
    const [comparisonData, setComparisonData] = useState<CountryAqiData[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>(CITIES[0].city);
    const [yearlyData, setYearlyData] = useState<YearlyAqiData[]>([]);

    useEffect(() => {
        setComparisonData(getMockCountryComparisonData(selectedCountries));
    }, [selectedCountries]);

    useEffect(() => {
        setYearlyData(getMockYearlyHistoricalData(selectedCity));
    }, [selectedCity]);

    const handleCountryToggle = (country: string) => {
        setSelectedCountries(prev => 
            prev.includes(country) 
                ? prev.filter(c => c !== country)
                : [...prev, country]
        );
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Comparison & Trends</h2>
                <p className="mt-2 text-lg text-slate-400">
                    Analyze air quality by comparing countries or viewing historical data for a specific city.
                </p>
            </div>

            {/* Country Comparison Section */}
            <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
                <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-3">
                    <GlobeAmericasIcon className="h-6 w-6" />
                    <span>Global AQI Comparison</span>
                </h3>
                <div className="mb-4">
                    <p className="text-sm text-slate-300 mb-2">Select countries to compare:</p>
                    <div className="flex flex-wrap gap-2">
                        {uniqueCountries.map(country => (
                             <button 
                                key={country}
                                onClick={() => handleCountryToggle(country)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors border ${
                                    selectedCountries.includes(country)
                                        ? 'bg-cyan-500 border-cyan-500 text-slate-900 font-semibold'
                                        : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300'
                                }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-80">
                    {comparisonData.length > 0 ? (
                        <CountryComparisonChart data={comparisonData} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            Please select at least one country to see the comparison.
                        </div>
                    )}
                </div>
            </div>

            {/* Yearly Historical Data Section */}
            <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-3 mb-2 sm:mb-0">
                        <ChartBarIcon className="h-6 w-6" />
                        <span>5-Year Historical AQI Trend</span>
                    </h3>
                    <div>
                        <select 
                            value={selectedCity} 
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="bg-slate-700/80 border border-slate-600 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                        >
                            {CITIES.map(c => <option key={c.city} value={c.city}>{c.city}, {c.country}</option>)}
                        </select>
                    </div>
                </div>
                 <div className="h-80">
                    <YearlyHistoricalChart data={yearlyData} />
                </div>
            </div>
        </div>
    );
};