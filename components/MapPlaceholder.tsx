
import React, { useEffect, useRef, useState } from 'react';
import { AQI_LEVELS, getAqiLevel } from '../constants';
import { MapPinIcon } from './icons';

declare var L: any; // To inform TypeScript about the global L from Leaflet script

interface MapPlaceholderProps {
  aqi: number;
  location: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ aqi, location }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [20, 0],
        zoom: 2,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);
    }

    // Cleanup on unmount
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []);

  // Update map on location change
  useEffect(() => {
    const fetchCoordinates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          return { lat: parseFloat(lat), lon: parseFloat(lon) };
        } else {
          throw new Error(`Could not find location: "${location}"`);
        }
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred while fetching coordinates.');
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    if (location && mapRef.current) {
      fetchCoordinates().then(coords => {
        if (coords && mapRef.current) {
          const map = mapRef.current;
          map.setView([coords.lat, coords.lon], 11);
          
          const level = getAqiLevel(aqi);
          const levelInfo = AQI_LEVELS[level];

          // Update Marker
          if (markerRef.current) {
            markerRef.current.setLatLng([coords.lat, coords.lon]);
          } else {
            markerRef.current = L.marker([coords.lat, coords.lon]).addTo(map);
          }
          markerRef.current.bindPopup(`<b>${location}</b><br>AQI: ${aqi}`).openPopup();

          // Update Circle
          const circleRadius = 500 + aqi * 20;
          if (circleRef.current) {
            circleRef.current.setLatLng([coords.lat, coords.lon]);
            circleRef.current.setRadius(circleRadius);
            circleRef.current.setStyle({
              color: levelInfo.mapColor,
              fillColor: levelInfo.mapColor,
            });
          } else {
            circleRef.current = L.circle([coords.lat, coords.lon], {
              color: levelInfo.mapColor,
              fillColor: levelInfo.mapColor,
              fillOpacity: 0.25,
              radius: circleRadius,
              weight: 1,
            }).addTo(map);
          }
        }
      });
    }
  }, [location, aqi]);

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-slate-300 mb-4 self-start flex items-center gap-2">
            <MapPinIcon className="h-5 w-5"/>
            Location Overview
        </h3>
        <div className="relative w-full flex-grow rounded-lg bg-slate-700/50 overflow-hidden">
             {isLoading && (
                 <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-700/50 backdrop-blur-sm">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                 </div>
             )}
            {error && <div className="absolute inset-0 flex items-center justify-center z-10 text-center p-4 text-red-400 bg-slate-800/80">{error}</div>}
            <div ref={mapContainerRef} className="w-full h-full z-0" />
        </div>
    </div>
  );
};