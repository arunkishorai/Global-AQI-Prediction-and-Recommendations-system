import type { AirQualityData, AqiRankingItem, Recommendations, CountryAqiData, YearlyAqiData } from '../types';
import { getAqiLevel } from '../constants';

const RECOMMENDATIONS_DATA: Record<AirQualityData['level'], Recommendations> = {
    'Good': {
        general: "It's a beautiful day for outdoor activities! Enjoy the fresh air.",
        'Asthma': "Excellent air quality. It's a great time for outdoor exercise.",
        'Heart Issues': "Ideal conditions for outdoor activities. Enjoy!",
        'Allergies': "Air quality is good, but check pollen counts if you have seasonal allergies.",
        'Sinus': "Clear air should help keep sinus issues at bay. Enjoy the day.",
        'Cold/Flu': "Fresh air can be beneficial. A light walk outside is a good idea if you feel up to it.",
        'Chronic (COPD)': "Perfect weather to be outdoors. Take advantage of the clean air."
    },
    'Moderate': {
        general: "Air quality is acceptable. However, if you're unusually sensitive to pollution, you might want to reduce intense outdoor activities.",
        'Asthma': 'Monitor for symptoms. Keep your rescue inhaler handy if you plan intense activity.',
        'Heart Issues': 'Pay attention to symptoms like palpitations or unusual fatigue. Reduce heavy exertion.',
        'Allergies': 'Airborne irritants may be slightly elevated. Consider taking allergy medication before going out.',
        'Sinus': 'You might experience slight irritation. A saline nasal spray can help.',
        'Cold/Flu': 'Your respiratory system is already stressed. Limit time outdoors, especially in high-traffic areas.',
        'Chronic (COPD)': 'Avoid strenuous activity outdoors. Monitor your breathing closely.'
    },
    'Unhealthy for Sensitive Groups': {
        general: "People with heart or lung disease, older adults, and children should reduce prolonged or heavy exertion. It's a good day for indoor activities.",
        'Asthma': 'You are at increased risk. Avoid outdoor activities and stay in a well-ventilated indoor space. Keep your rescue inhaler with you at all times.',
        'Heart Issues': 'Avoid all outdoor exertion. Stay indoors and monitor for symptoms like chest pain or shortness of breath.',
        'Allergies': 'High levels of pollutants can worsen allergy symptoms. Stay indoors with windows closed.',
        'Sinus': 'Pollutants can cause significant sinus irritation. Stay indoors and consider using a humidifier.',
        'Cold/Flu': 'Staying indoors is crucial to avoid further respiratory stress. Rest and hydrate.',
        'Chronic (COPD)': 'Significant risk. Remain indoors, use your prescribed medications, and consider using an air purifier.'
    },
    'Unhealthy': {
        general: "Everyone may experience some adverse health effects. It's recommended to limit time spent outdoors. If you go out, consider wearing a high-quality mask (N95 or P100).",
        'Asthma': 'High risk of an asthma attack. Stay indoors with an air purifier if possible. Do not exercise outdoors.',
        'Heart Issues': 'High risk of cardiovascular events. Remain indoors and avoid any exertion.',
        'Allergies': 'Symptoms are likely to be severe. Stay indoors with windows closed and use an air purifier.',
        'Sinus': 'Expect significant discomfort. Stay indoors. Nasal irrigation may provide some relief.',
        'Cold/Flu': 'Avoid going outside. Poor air quality can worsen your illness and prolong recovery.',
        'Chronic (COPD)': 'Very high risk. Stay indoors, use your oxygen if prescribed, and avoid all triggers.'
    },
    'Very Unhealthy': {
        general: "Health alert: Everyone should avoid prolonged or heavy exertion outdoors. Sensitive groups should remain indoors. Keep windows closed and run an air purifier if you have one.",
        'Asthma': 'Dangerous conditions. Stay indoors, use an air purifier, and have an emergency plan ready.',
        'Heart Issues': 'Dangerous conditions. Remain indoors and avoid all physical activity. Seek medical attention if you experience symptoms.',
        'Allergies': 'Severe conditions. Isolate yourself from outdoor air as much as possible.',
        'Sinus': 'Conditions will likely cause severe sinus pain and congestion. Stay inside.',
        'Cold/Flu': 'Exposure could lead to serious complications like pneumonia. Do not go outside.',
        'Chronic (COPD)': 'Extremely dangerous. Stay indoors with purified air and contact your doctor if symptoms worsen.'
    },
    'Hazardous': {
        general: "Health warning of emergency conditions. Everyone should avoid all physical activity outdoors. Remain indoors, keep windows and doors closed, and run an air purifier on high.",
        'Asthma': 'Life-threatening conditions. Follow your emergency action plan and do not leave your home.',
        'Heart Issues': 'Life-threatening risk. Stay indoors and avoid any activity that strains your heart.',
        'Allergies': 'Extreme conditions. Seal windows and doors if possible and use high-efficiency air purifiers.',
        'Sinus': 'Expect extreme irritation and pain. Do not go outside.',
        'Cold/Flu': 'Critical to stay indoors to prevent severe respiratory complications.',
        'Chronic (COPD)': 'Life-threatening. Stay indoors, use all prescribed treatments, and be prepared to seek emergency medical care.'
    }
};


const generateRandomData = (location: string): AirQualityData => {
  const aqi = Math.floor(Math.random() * 350);
  const level = getAqiLevel(aqi);

  const pollutants = [
    { name: 'PM2.5', symbol: 'PM₂.₅', value: parseFloat((Math.random() * 150).toFixed(1)), unit: 'µg/m³', level: getPollutantLevel() },
    { name: 'PM10', symbol: 'PM₁₀', value: parseFloat((Math.random() * 200).toFixed(1)), unit: 'µg/m³', level: getPollutantLevel() },
    { name: 'Ozone', symbol: 'O₃', value: parseFloat((Math.random() * 100).toFixed(1)), unit: 'ppb', level: getPollutantLevel() },
    { name: 'Nitrogen Dioxide', symbol: 'NO₂', value: parseFloat((Math.random() * 50).toFixed(1)), unit: 'ppb', level: getPollutantLevel() },
    { name: 'Sulfur Dioxide', symbol: 'SO₂', value: parseFloat((Math.random() * 20).toFixed(1)), unit: 'ppb', level: getPollutantLevel() },
    { name: 'Carbon Monoxide', symbol: 'CO', value: parseFloat((Math.random() * 5).toFixed(1)), unit: 'ppm', level: getPollutantLevel() },
  ];

  const forecast = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => ({
    day,
    aqi: Math.floor(Math.random() * 200)
  }));

  const historical = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (30 - i));
    return {
      date: d.toLocaleString('en-US', { month: 'short', day: 'numeric' }),
      aqi: Math.floor(Math.random() * 250) + 20,
    };
  });

  return {
    location,
    aqi,
    level,
    recommendations: getRecommendations(level),
    pollutants,
    forecast,
    historical,
  };
};

const getPollutantLevel = (): 'Good' | 'Moderate' | 'Unhealthy' => {
  const rand = Math.random();
  if (rand < 0.6) return 'Good';
  if (rand < 0.9) return 'Moderate';
  return 'Unhealthy';
};

const getRecommendations = (level: keyof typeof RECOMMENDATIONS_DATA): Recommendations => {
    return RECOMMENDATIONS_DATA[level] || RECOMMENDATIONS_DATA['Good'];
};


export const getMockAirQualityData = (location: string): AirQualityData => {
    return generateRandomData(location);
}

export const CITIES = [
    { city: 'Delhi', country: 'India' },
    { city: 'Beijing', country: 'China' },
    { city: 'Los Angeles', country: 'USA' },
    { city: 'London', country: 'UK' },
    { city: 'Mexico City', country: 'Mexico' },
    { city: 'São Paulo', country: 'Brazil' },
    { city: 'Cairo', country: 'Egypt' },
    { city: 'Moscow', country: 'Russia' },
    { city: 'Tokyo', country: 'Japan' },
    { city: 'Sydney', country: 'Australia' },
    { city: 'Paris', country: 'France' },
    { city: 'Dubai', country: 'UAE' },
    { city: 'Lagos', country: 'Nigeria' },
    { city: 'Buenos Aires', country: 'Argentina' },
    { city: 'Zurich', country: 'Switzerland' }
];

export const getMockRankingsData = (): AqiRankingItem[] => {
    return CITIES.map(c => {
        const aqi = Math.floor(Math.random() * 350);
        return {
            location: c.city,
            country: c.country,
            aqi,
            level: getAqiLevel(aqi)
        };
    }).sort((a, b) => b.aqi - a.aqi); // Sort from highest AQI to lowest
};

export const getMockCountryComparisonData = (countries: string[]): CountryAqiData[] => {
    return countries.map(country => ({
        country,
        aqi: Math.floor(Math.random() * 300) + 20 // Random AQI between 20 and 320
    })).sort((a,b) => b.aqi - a.aqi);
};

export const getMockYearlyHistoricalData = (location: string): YearlyAqiData[] => {
    const currentYear = new Date().getFullYear();
    const data: YearlyAqiData[] = [];
    for (let i = 4; i >= 0; i--) {
        // Create some variance based on location hash to make graphs look different
        const locationFactor = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const randomFactor = (locationFactor % 50) - 25; // -25 to 25
        data.push({
            year: (currentYear - i).toString(),
            aqi: Math.floor(Math.random() * 100) + 50 + randomFactor, // Base AQI with some randomness
        });
    }
    return data;
};