export const AQI_LEVELS = {
  Good: {
    color: 'bg-green-500',
    textColor: 'text-green-300',
    borderColor: 'border-green-500',
    mapColor: '#22c55e',
    gaugeColor: '#00E400',
    range: '0-50',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  },
  Moderate: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-300',
    borderColor: 'border-yellow-500',
    mapColor: '#eab308',
    gaugeColor: '#FFFF00',
    range: '51-100',
    description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  },
  'Unhealthy for Sensitive Groups': {
    color: 'bg-orange-500',
    textColor: 'text-orange-300',
    borderColor: 'border-orange-500',
    mapColor: '#f97316',
    gaugeColor: '#FF7E00',
    range: '101-150',
    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
  },
  Unhealthy: {
    color: 'bg-red-500',
    textColor: 'text-red-300',
    borderColor: 'border-red-500',
    mapColor: '#ef4444',
    gaugeColor: '#FF0000',
    range: '151-200',
    description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
  },
  'Very Unhealthy': {
    color: 'bg-purple-700',
    textColor: 'text-purple-300',
    borderColor: 'border-purple-700',
    mapColor: '#9333ea',
    gaugeColor: '#8F3F97',
    range: '201-300',
    description: 'Health alert: The risk of health effects is increased for everyone.',
  },
  Hazardous: {
    color: 'bg-red-900',
    textColor: 'text-red-400',
    borderColor: 'border-red-900',
    mapColor: '#7f1d1d',
    gaugeColor: '#7E0023',
    range: '301+',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
  },
};

export const getAqiLevel = (aqi: number): keyof typeof AQI_LEVELS => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};
