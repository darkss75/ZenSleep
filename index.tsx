
import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  AlarmClock, BarChart3, Music2, User, Plus, Bell, 
  SignalHigh, Wifi, BatteryFull, Calendar, TrendingUp, 
  Moon, Timer, Lightbulb, Sun, Delete
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';

// --- Types & Constants ---
export enum AppScreen {
  ALARMS = 'ALARMS',
  MISSION = 'MISSION',
  ANALYSIS = 'ANALYSIS',
  SOUNDS = 'SOUNDS',
  PROFILE = 'PROFILE'
}

interface Alarm {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  label: string;
  days: string[];
  isActive: boolean;
}

interface SleepDataPoint {
  day: string;
  quality: number;
  isToday?: boolean;
}

const INITIAL_ALARMS: Alarm[] = [
  { id: '1', time: '06:30', period: 'AM', label: 'Wake up & Shine', days: ['M', 'T', 'W', 'T', 'F'], isActive: true },
  { id: '2', time: '07:00', period: 'AM', label: 'Gym session', days: ['M', 'W', 'F'], isActive: true },
  { id: '3', time: '09:15', period: 'AM', label: 'Weekend Brunch', days: ['S', 'S'], isActive: false },
  { id: '4', time: '10:45', period: 'PM', label: 'Sleep reminder', days: ['Daily'], isActive: true },
];

const SLEEP_HISTORY: SleepDataPoint[] = [
  { day: 'M', quality: 70 },
  { day: 'T', quality: 65 },
  { day: 'W', quality: 85 },
  { day: 'T', quality: 50 },
  { day: 'F', quality: 90, isToday: true },
  { day: 'S', quality: 75 },
  { day: 'S', quality: 80 },
];

// --- Custom Icons ---
const CustomIcons = {
  Alarm: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="m5 3 2 2"/><path d="m19 3-2 2"/>
    </svg>
  ),
  Psychology: ({ size = 24, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
      <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"/>
      <path d="M12 11V9M12 15v-2M9 12h2M13 12h2"/>
    </svg>
  )
};

// --- Sub-Components ---

const Navigation = ({ activeScreen, onNavigate }: { activeScreen: AppScreen, onNavigate: (s: AppScreen) => void }) => {
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
          <button key={item.screen} onClick={() => onNavigate(item.screen)} className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-[#47c2eb]' : 'text-slate-300'}`}>
            <Icon size={24} strokeWidth={isActive ? 3 : 2} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
            {isActive && <div className="w-1 h-1 rounded-full bg-[#47c2eb] mt-0.5" />}
          </button>
        );
      })}
    </nav>
  );
};

const AlarmsScreen = ({ alarms, onToggle, currentTime, onStartMission }: any) => {
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#e0f2fe] via-[#fef2f2] to-[#f0f9ff] px-6 pt-12 pb-24 overflow-y-auto no-scrollbar relative">
      <div className="absolute top-4 left-0 right-0 px-8 flex justify-between items-center text-slate-700">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex gap-1"><SignalHigh size={14} /><Wifi size={14} /><BatteryFull size={14} /></div>
      </div>
      <div className="text-center mt-12 mb-12">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1 block">Current Time</span>
        <h1 className="text-7xl font-light text-slate-800 tracking-tight leading-none">{formattedTime}</h1>
        <p className="text-slate-500 mt-3 text-sm font-medium">{formattedDate}</p>
      </div>
      <div className="space-y-4">
        {alarms.map((alarm: Alarm) => (
          <div key={alarm.id} className={`p-5 rounded-3xl flex justify-between items-center transition-all ${alarm.isActive ? 'bg-white/50 backdrop-blur-md shadow-sm border border-white/40' : 'bg-white/20 opacity-60'}`}>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-slate-800">{alarm.time}</span>
                <span className={`text-sm font-bold ${alarm.isActive ? 'text-[#47c2eb]' : 'text-slate-400'}`}>{alarm.period}</span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">{alarm.label}</p>
              <div className="flex gap-1.5 mt-3">
                {alarm.days.map((day, idx) => (
                  <div key={idx} className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${day === 'Daily' ? 'px-3 w-auto rounded-xl bg-[#47c2eb]/10 text-[#47c2eb]' : alarm.isActive && !['S', 'S'].includes(day) ? 'bg-[#47c2eb]/10 text-[#47c2eb]' : 'bg-slate-200/50 text-slate-400'}`}>{day}</div>
                ))}
              </div>
            </div>
            <button onClick={() => onToggle(alarm.id)} className={`relative w-12 h-6 rounded-full transition-colors ${alarm.isActive ? 'bg-[#47c2eb]' : 'bg-slate-300'}`}>
              <div className={`absolute w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${alarm.isActive ? 'translate-x-[26px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-20">
        <button onClick={onStartMission} className="w-16 h-16 bg-[#47c2eb] rounded-full shadow-lg flex items-center justify-center text-white active:scale-90 transition-transform">
          <Plus size={32} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

const MissionScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [userInput, setUserInput] = useState('');
  const num1 = 24, num2 = 58, answer = 82;
  const handleKeyClick = (v: string) => userInput.length < 3 && setUserInput(p => p + v);
  const handleBackspace = () => setUserInput(p => p.slice(0, -1));
  const handleOk = () => parseInt(userInput) === answer ? onFinish() : (alert('Try again!'), setUserInput(''));
  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 py-16 bg-gradient-to-br from-[#FF9D6C] via-[#FF5E9B] to-[#FFD93D] relative overflow-hidden">
      <div className="text-center space-y-2 z-10">
        <span className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase">Good Morning</span>
        <h1 className="text-white text-6xl font-black tracking-tighter animate-pulse">WAKE UP!</h1>
        <div className="flex justify-center items-center gap-2 text-white/90">
          <CustomIcons.Alarm size={20} className="text-white" /><span className="text-xl font-semibold">07:30 AM</span>
        </div>
      </div>
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center gap-6 z-10">
        <div className="bg-[#47c2eb]/20 p-4 rounded-full"><CustomIcons.Psychology className="w-10 h-10 text-[#47c2eb]" /></div>
        <div className="text-center"><h2 className="text-slate-800 text-xl font-extrabold">Mental Mission</h2><p className="text-slate-500 text-sm mt-1">Solve to dismiss alarm</p></div>
        <div className="text-slate-900 text-5xl font-black">{num1} + {num2} = ?</div>
        <div className="w-40 h-16 bg-white border-b-4 border-[#47c2eb] rounded-2xl flex items-center justify-center shadow-inner"><span className="text-[#47c2eb] text-4xl font-bold tracking-[0.2em]">{userInput.split('').join(' ') || '_ _'}</span></div>
      </div>
      <div className="w-full max-w-xs grid grid-cols-3 gap-3 z-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <button key={n} onClick={() => handleKeyClick(n.toString())} className="h-14 rounded-2xl bg-white/20 text-white text-2xl font-bold active:bg-white/40 shadow-sm">{n}</button>)}
        <button onClick={handleBackspace} className="h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center"><Delete size={24} /></button>
        <button onClick={() => handleKeyClick('0')} className="h-14 rounded-2xl bg-white/20 text-white text-2xl font-bold">0</button>
        <button onClick={handleOk} className="h-14 rounded-2xl bg-[#47c2eb] text-white text-lg font-black shadow-md">OK</button>
      </div>
    </div>
  );
};

const AnalysisScreen = () => (
  <div className="flex-1 flex flex-col bg-slate-50 px-6 pt-12 pb-28 overflow-y-auto no-scrollbar relative">
    <header className="flex justify-between items-center mb-8"><div><h1 className="text-2xl font-black text-slate-800">Sleep Analysis</h1><p className="text-slate-400 text-sm">Monday, Oct 23</p></div><button className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#47c2eb]"><Calendar size={20} /></button></header>
    <div className="relative flex flex-col items-center mb-12">
      <div className="w-64 h-64 relative flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90"><circle cx="128" cy="128" r="110" stroke="#f1f5f9" strokeWidth="16" fill="transparent"/><circle cx="128" cy="128" r="110" stroke="#47c2eb" strokeWidth="16" fill="transparent" strokeDasharray={691} strokeDashoffset={691 * 0.27} strokeLinecap="round"/></svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Last Night</span><span className="text-5xl font-black text-slate-800">7h 20m</span><div className="flex items-center gap-1 text-emerald-500 font-bold text-xs mt-2"><TrendingUp size={14} /><span>+45m vs. Goal</span></div></div>
      </div>
    </div>
    <section className="mb-8">
      <div className="flex justify-between items-end mb-4"><h3 className="text-lg font-extrabold text-slate-800">Sleep Quality</h3><span className="text-[#47c2eb] text-sm font-bold">Weekly Avg: 84%</span></div>
      <div className="bg-white rounded-[2rem] p-6 shadow-sm h-48">
        <ResponsiveContainer width="100%" height="100%"><BarChart data={SLEEP_HISTORY}><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={10}/><Bar dataKey="quality" radius={[10, 10, 10, 10]} barSize={10}>{SLEEP_HISTORY.map((e, i) => <Cell key={i} fill={e.isToday ? '#47c2eb' : '#a78bfa88'} />)}</Bar></BarChart></ResponsiveContainer>
      </div>
    </section>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.ALARMS);
  const [alarms, setAlarms] = useState<Alarm[]>(INITIAL_ALARMS);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleAlarm = (id: string) => setAlarms(prev => prev.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.ALARMS: return <AlarmsScreen alarms={alarms} onToggle={toggleAlarm} currentTime={currentTime} onStartMission={() => setCurrentScreen(AppScreen.MISSION)} />;
      case AppScreen.MISSION: return <MissionScreen onFinish={() => setCurrentScreen(AppScreen.ALARMS)} />;
      case AppScreen.ANALYSIS: return <AnalysisScreen />;
      default: return <div className="flex-1 flex items-center justify-center text-slate-400">Coming soon...</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="flex-1 flex flex-col overflow-hidden">{renderScreen()}</div>
      {currentScreen !== AppScreen.MISSION && <Navigation activeScreen={currentScreen} onNavigate={setCurrentScreen} />}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 rounded-full"></div>
    </div>
  );
};

// --- Initial Render ---
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
