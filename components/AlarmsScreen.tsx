
import React from 'react';
import { Alarm } from '../types.ts';
import { Plus, Bell, SignalHigh, Wifi, BatteryFull } from 'lucide-react';

interface Props {
  alarms: Alarm[];
  onToggle: (id: string) => void;
  currentTime: Date;
  onStartMission: () => void;
}

const AlarmsScreen: React.FC<Props> = ({ alarms, onToggle, currentTime, onStartMission }) => {
  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#e0f2fe] via-[#fef2f2] to-[#f0f9ff] px-6 pt-12 pb-24 overflow-y-auto no-scrollbar relative">
      {/* Fake Status Bar */}
      <div className="absolute top-4 left-0 right-0 px-8 flex justify-between items-center text-slate-700">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex gap-1">
          <SignalHigh size={14} />
          <Wifi size={14} />
          <BatteryFull size={14} />
        </div>
      </div>

      {/* Main Clock */}
      <div className="text-center mt-12 mb-12">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1 block">Current Time</span>
        <h1 className="text-7xl font-light text-slate-800 tracking-tight leading-none">{formattedTime}</h1>
        <p className="text-slate-500 mt-3 text-sm font-medium">{formattedDate}</p>
      </div>

      {/* Alarm List */}
      <div className="space-y-4">
        {alarms.map((alarm) => (
          <div 
            key={alarm.id} 
            className={`
              relative p-5 rounded-3xl flex justify-between items-center transition-all duration-300
              ${alarm.isActive 
                ? 'bg-white/50 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40' 
                : 'bg-white/20 opacity-60'}
            `}
          >
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-slate-800 tracking-tight">{alarm.time}</span>
                <span className={`text-sm font-bold ${alarm.isActive ? 'text-[#47c2eb]' : 'text-slate-400'}`}>
                  {alarm.period}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-1">{alarm.label}</p>
              
              <div className="flex gap-1.5 mt-3">
                {alarm.days.map((day, idx) => (
                  <div 
                    key={idx}
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                      ${day === 'Daily' ? 'px-3 w-auto rounded-xl bg-[#47c2eb]/10 text-[#47c2eb]' : 
                        alarm.isActive && !['S', 'S'].includes(day) 
                          ? 'bg-[#47c2eb]/10 text-[#47c2eb]' 
                          : 'bg-slate-200/50 text-slate-400'}
                    `}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* iOS Toggle Switch */}
            <button 
              onClick={() => onToggle(alarm.id)}
              className={`
                relative w-12 h-6 rounded-full transition-colors duration-200 flex items-center
                ${alarm.isActive ? 'bg-[#47c2eb]' : 'bg-slate-300'}
              `}
            >
              <div className={`
                absolute w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200
                ${alarm.isActive ? 'translate-x-[26px]' : 'translate-x-[2px]'}
              `} />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Plus Button */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={onStartMission}
          className="w-16 h-16 bg-[#47c2eb] rounded-full shadow-[0_10px_30px_rgba(71,194,235,0.4)] flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <Plus size={32} strokeWidth={3} />
        </button>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-20 -left-10 w-40 h-40 bg-[#47c2eb]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-10 w-40 h-40 bg-pink-300/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default AlarmsScreen;
