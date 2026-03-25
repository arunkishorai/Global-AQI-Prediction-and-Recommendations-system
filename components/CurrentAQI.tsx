import React, { useState, useEffect } from 'react';
import { AQI_LEVELS } from '../constants';
import type { AirQualityData, Recommendations, HealthCondition } from '../types';
import { InfoIcon } from './icons';

const HEALTH_CONDITIONS: HealthCondition[] = ['Asthma', 'Heart Issues', 'Allergies', 'Sinus', 'Cold/Flu', 'Chronic (COPD)'];

interface CurrentAQIProps {
    aqi: number;
    level: AirQualityData['level'];
    recommendations: Recommendations;
    location: string;
}

export const CurrentAQI: React.FC<CurrentAQIProps> = ({ aqi, level, recommendations, location }) => {
    const levelInfo = AQI_LEVELS[level];
    const [animatedAqi, setAnimatedAqi] = useState(0);
    const [isCircleAnimated, setIsCircleAnimated] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState<HealthCondition | null>(null);

    const radius = 80;
    const strokeWidth = 16;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(aqi / 500, 1);
    const offset = circumference * (1 - progress);

    useEffect(() => {
        setIsCircleAnimated(false);
        setAnimatedAqi(0);
        
        const circleTimer = setTimeout(() => setIsCircleAnimated(true), 100);

        let start = 0;
        const end = aqi;
        if (start === end) {
            setAnimatedAqi(end);
            return;
        };

        const duration = 1500;
        const incrementTime = Math.max(duration / end, 1);
        
        const numberTimer = setInterval(() => {
            start += 1;
            if (start >= end) {
                setAnimatedAqi(end);
                clearInterval(numberTimer);
            } else {
                setAnimatedAqi(start);
            }
        }, incrementTime);

        return () => {
            clearTimeout(circleTimer);
            clearInterval(numberTimer);
        };
    }, [aqi]);
    
    const handleConditionClick = (condition: HealthCondition) => {
        setSelectedCondition(prev => prev === condition ? null : condition);
    };

    const recommendationText = selectedCondition 
        ? recommendations[selectedCondition] || recommendations.general 
        : recommendations.general;

    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50 h-full flex flex-col">
            <div>
                <h2 className="text-lg font-semibold text-slate-300 mb-4 text-center">Current Air Quality in {location}</h2>
                <div className="relative w-52 h-52 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-slate-700" />
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            fill="none"
                            strokeWidth={strokeWidth}
                            stroke={levelInfo.gaugeColor}
                            strokeLinecap="round"
                            transform="rotate(-90 100 100)"
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: isCircleAnimated ? offset : circumference,
                                transition: 'stroke-dashoffset 1.5s ease-out'
                            }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-6xl font-bold ${levelInfo.textColor}`}>{animatedAqi}</span>
                        <span className={`block text-xl font-semibold mt-1 px-2 text-center ${levelInfo.textColor}`}>{level}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <h4 className="font-semibold text-slate-300 text-center mb-3">Get Personalized Advice</h4>
                <div className="flex flex-wrap justify-center gap-2">
                    {HEALTH_CONDITIONS.map(condition => (
                        <button 
                            key={condition}
                            onClick={() => handleConditionClick(condition)}
                            className={`px-3 py-1 text-sm rounded-full transition-colors border ${
                                selectedCondition === condition
                                    ? 'bg-cyan-500 border-cyan-500 text-slate-900 font-semibold'
                                    : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300'
                            }`}
                        >
                            {condition}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-4 bg-slate-700/30 rounded-lg flex items-start gap-3">
                <InfoIcon className={`h-5 w-5 mt-0.5 shrink-0 ${levelInfo.textColor}`} />
                <div>
                    <h4 className="font-semibold text-slate-200">Recommendation</h4>
                    <p className="text-slate-300 text-sm">{recommendationText}</p>
                </div>
            </div>
        </div>
    );
};