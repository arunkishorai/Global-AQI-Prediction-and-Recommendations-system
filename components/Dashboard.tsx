import React from 'react';
import type { AirQualityData } from '../types';
import { CurrentAQI } from './CurrentAQI';
import { PollutantDetails } from './PollutantDetails';
import { Forecast } from './Forecast';
import { HistoricalChart } from './HistoricalChart';
import { MapPlaceholder } from './MapPlaceholder';

interface DashboardProps {
  data: AirQualityData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
            <CurrentAQI aqi={data.aqi} level={data.level} recommendations={data.recommendations} location={data.location}/>
        </div>
        <div>
            <MapPlaceholder aqi={data.aqi} location={data.location}/>
        </div>
      </div>
      <PollutantDetails pollutants={data.pollutants} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Forecast forecast={data.forecast} />
        <HistoricalChart data={data.historical} />
      </div>
    </div>
  );
};