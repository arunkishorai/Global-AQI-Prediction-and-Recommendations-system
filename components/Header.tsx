
import React from 'react';
import { WindIcon, MenuIcon } from './icons';

interface HeaderProps {
    activePage: 'home' | 'aqi-details' | 'user-guide' | 'comparison';
    onNavigate: (page: 'home' | 'aqi-details' | 'user-guide' | 'comparison') => void;
}

const NavLink: React.FC<{
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-slate-300 hover:bg-slate-700/50'
            }`}
        >
            {children}
        </button>
    );
};

export const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <WindIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">Aura</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
              <NavLink isActive={activePage === 'home'} onClick={() => onNavigate('home')}>
                  Home
              </NavLink>
              <NavLink isActive={activePage === 'aqi-details'} onClick={() => onNavigate('aqi-details')}>
                  AQI Details
              </NavLink>
              <NavLink isActive={activePage === 'comparison'} onClick={() => onNavigate('comparison')}>
                  Compare
              </NavLink>
              <NavLink isActive={activePage === 'user-guide'} onClick={() => onNavigate('user-guide')}>
                  User Guide
              </NavLink>
          </nav>
          <div className="flex items-center">
            <button className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 md:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};