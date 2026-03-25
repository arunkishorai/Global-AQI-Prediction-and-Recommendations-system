export interface Pollutant {
  name: string;
  symbol: string;
  value: number;
  unit: string;
  level: 'Good' | 'Moderate' | 'Unhealthy';
}

export interface ForecastDay {
  day: string;
  aqi: number;
}

export interface HistoricalDataPoint {
  date: string;
  aqi: number;
}

export type HealthCondition = 'Asthma' | 'Heart Issues' | 'Allergies' | 'Sinus' | 'Cold/Flu' | 'Chronic (COPD)';

export interface Recommendations {
    general: string;
    [key: string]: string;
}

export interface AirQualityData {
  location: string;
  aqi: number;
  level: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  recommendations: Recommendations;
  pollutants: Pollutant[];
  forecast: ForecastDay[];
  historical: HistoricalDataPoint[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export interface AqiRankingItem {
    location: string;
    country: string;
    aqi: number;
    level: AirQualityData['level'];
}

export interface CountryAqiData {
    country: string;
    aqi: number;
}

export interface YearlyAqiData {
    year: string;
    aqi: number;
}