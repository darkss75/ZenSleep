
import React from 'react';
import { AppScreen } from '../types.ts';
import { AlarmClock, BarChart3, Music2, User } from 'lucide-react';

interface Props {
  activeScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const Navigation: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { screen: AppScreen.ALARMS, label: 'Alarms', icon: AlarmClock },
    { screen: AppScreen.ANALYSIS, label: 'Analysis', icon: BarChart3 },
    { screen: AppScreen.SOUNDS, label: 'Sounds', icon: Music2 },
    { screen: AppScreen.PROFILE, label: 'Profile', icon: User },
  ];

  return (
    <nav className="h-24 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between px-8 absolute bottom-0 left-0 right-0 z-10">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.screen;
        
        return (
          <button 
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#47c2eb]' : 'text-slate-300'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 3 : 2} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-0'}`}>
              {item.label}
            </span>
            {isActive && <div className="w-1 h-1 rounded-full bg-[#47c2eb] mt-0.5" />}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
