
import React, { useState, useEffect } from 'react';
import { AppScreen, Alarm } from './types';
import AlarmsScreen from './components/AlarmsScreen';
import MissionScreen from './components/MissionScreen';
import AnalysisScreen from './components/AnalysisScreen';
import Navigation from './components/Navigation';

const INITIAL_ALARMS: Alarm[] = [
  { id: '1', time: '06:30', period: 'AM', label: 'Wake up & Shine', days: ['M', 'T', 'W', 'T', 'F'], isActive: true },
  { id: '2', time: '07:00', period: 'AM', label: 'Gym session', days: ['M', 'W', 'F'], isActive: true },
  { id: '3', time: '09:15', period: 'AM', label: 'Weekend Brunch', days: ['S', 'S'], isActive: false },
  { id: '4', time: '10:45', period: 'PM', label: 'Sleep reminder', days: ['Daily'], isActive: true },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.ALARMS);
  const [alarms, setAlarms] = useState<Alarm[]>(INITIAL_ALARMS);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleAlarm = (id: string) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const startMission = () => setCurrentScreen(AppScreen.MISSION);
  const finishMission = () => setCurrentScreen(AppScreen.ALARMS);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.ALARMS:
        return <AlarmsScreen 
          alarms={alarms} 
          onToggle={toggleAlarm} 
          currentTime={currentTime}
          onStartMission={startMission}
        />;
      case AppScreen.MISSION:
        return <MissionScreen onFinish={finishMission} />;
      case AppScreen.ANALYSIS:
        return <AnalysisScreen />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Screen coming soon...
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderScreen()}
      </div>
      
      {currentScreen !== AppScreen.MISSION && (
        <Navigation 
          activeScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}

      {/* iOS Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 rounded-full"></div>
    </div>
  );
};

export default App;
