
import React from 'react';
import { SearchIcon, MapPinIcon, ChartBarIcon, SparklesIcon, CalendarIcon, InfoIcon } from '../components/icons';

const GuideSection: React.FC<{
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}> = ({ icon, title, children }) => (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <h3 className="text-xl font-bold text-cyan-300 mb-3 flex items-center gap-3">
            {icon}
            <span>{title}</span>
        </h3>
        <div className="text-slate-300 space-y-2">
            {children}
        </div>
    </div>
);

export const UserGuidePage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Welcome to Aura!</h2>
                <p className="mt-2 text-lg text-slate-400">
                    Your personal air quality companion. Here’s a quick guide to help you get the most out of the app.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuideSection icon={<SearchIcon className="h-6 w-6" />} title="Find Your Location">
                    <p>
                        Use the search bar on the <strong className="text-cyan-400">Home</strong> page to find real-time air quality data for any city or area. Just type a name and press "Search" to update the dashboard.
                    </p>
                </GuideSection>

                <GuideSection icon={<InfoIcon className="h-6 w-6" />} title="Understand the Dashboard">
                    <p>
                        The main dashboard gives you a complete overview. You'll see the current Air Quality Index (AQI), health recommendations, and a breakdown of individual pollutants in the air.
                    </p>
                </GuideSection>

                <GuideSection icon={<MapPinIcon className="h-6 w-6" />} title="Interactive Map">
                    <p>
                        The <strong className="text-cyan-400">Location Overview</strong> map visualizes the AQI in your searched area. The colored circle indicates the current air quality level, giving you an immediate sense of the conditions.
                    </p>
                </GuideSection>
                
                <GuideSection icon={<CalendarIcon className="h-6 w-6" />} title="Check the Forecast">
                    <p>
                        Plan your week with the 5-day AQI forecast. This helps you anticipate changes in air quality and schedule outdoor activities accordingly.
                    </p>
                </GuideSection>

                <GuideSection icon={<ChartBarIcon className="h-6 w-6" />} title="View Historical Data">
                    <p>
                        The historical chart shows AQI trends over the past 30 days. This can help you understand patterns and see how air quality has been changing in your area.
                    </p>
                </GuideSection>
                
                <GuideSection icon={<SparklesIcon className="h-6 w-6" />} title="Chat with Aura Assistant">
                    <p>
                        Have questions? Click the sparkle icon to open the <strong className="text-cyan-400">Aura Assistant</strong>. You can ask for advice, inquire about specific pollutants, or get personalized recommendations based on the current data.
                    </p>
                </GuideSection>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700/50 text-center">
                 <h3 className="text-xl font-bold text-slate-200 mb-2">Explore Global Rankings</h3>
                 <p className="text-slate-400">
                    Navigate to the <strong className="text-cyan-400">AQI Details</strong> page from the header to see a list of major cities ranked by their current air quality, from most to least polluted.
                 </p>
            </div>

        </div>
    );
};
