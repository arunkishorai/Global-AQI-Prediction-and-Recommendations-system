
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AqiDetailsPage } from './pages/AqiDetailsPage';
import { UserGuidePage } from './pages/UserGuidePage';
import { ComparisonPage } from './pages/ComparisonPage';
import { Chatbot } from './components/Chatbot';
import { getMockAirQualityData } from './services/airQualityService';
import type { AirQualityData } from './types';
import { FloatingChatButton } from './components/FloatingChatButton';

type Page = 'home' | 'aqi-details' | 'user-guide' | 'comparison';

export default function App(): React.ReactNode {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [location, setLocation] = useState<string>('San Francisco');
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const fetchAirQualityData = useCallback((loc: string) => {
    setIsLoading(true);
    setIsChatOpen(false); // Close chat when location changes
    // Simulate API call delay
    setTimeout(() => {
      const data = getMockAirQualityData(loc);
      setAirQualityData(data);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (currentPage === 'home') {
      fetchAirQualityData(location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, currentPage, fetchAirQualityData]);
  
  const handleLocationChange = (newLocation: string) => {
    if (newLocation !== location) {
        setLocation(newLocation);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <Header activePage={currentPage} onNavigate={setCurrentPage} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {currentPage === 'home' && (
          <HomePage
            location={location}
            onLocationChange={handleLocationChange}
            airQualityData={airQualityData}
            isLoading={isLoading}
          />
        )}
        {currentPage === 'aqi-details' && <AqiDetailsPage />}
        {currentPage === 'user-guide' && <UserGuidePage />}
        {currentPage === 'comparison' && <ComparisonPage />}
      </main>
      
      {/* Floating Chatbot */}
      {currentPage === 'home' && airQualityData && !isChatOpen && (
        <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      )}
      {isChatOpen && airQualityData && (
        <Chatbot 
          airQualityData={airQualityData} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </div>
  );
}