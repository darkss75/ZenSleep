
import React from 'react';
import { Calendar, TrendingUp, Moon, Timer, Lightbulb, Sun, BarChart3 } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from 'recharts';
import { SleepDataPoint } from '../types';

const SLEEP_HISTORY: SleepDataPoint[] = [
  { day: 'M', quality: 70 },
  { day: 'T', quality: 65 },
  { day: 'W', quality: 85 },
  { day: 'T', quality: 50 },
  { day: 'F', quality: 90, isToday: true },
  { day: 'S', quality: 75 },
  { day: 'S', quality: 80 },
];

const AnalysisScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 px-6 pt-12 pb-28 overflow-y-auto no-scrollbar relative">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Sleep Analysis</h1>
          <p className="text-slate-400 text-sm font-semibold">Monday, Oct 23</p>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#47c2eb]">
          <Calendar size={20} />
        </button>
      </header>

      {/* Main Circular Stat */}
      <div className="relative flex flex-col items-center mb-12">
        <div className="w-64 h-64 relative flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle 
              cx="128" cy="128" r="110" 
              stroke="currentColor" strokeWidth="16" fill="transparent" 
              className="text-slate-200"
            />
            <circle 
              cx="128" cy="128" r="110" 
              stroke="currentColor" strokeWidth="16" fill="transparent" 
              strokeDasharray={2 * Math.PI * 110}
              strokeDashoffset={2 * Math.PI * 110 * (1 - 0.73)}
              className="text-[#47c2eb]"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Last Night</span>
            <span className="text-5xl font-black text-slate-800">7h 20m</span>
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs mt-2">
              <TrendingUp size={14} />
              <span>+45m vs. Goal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-extrabold text-slate-800">Sleep Quality</h3>
          <span className="text-[#47c2eb] text-sm font-bold">Weekly Avg: 84%</span>
        </div>
        <div className="bg-white rounded-[2rem] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SLEEP_HISTORY}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <Bar dataKey="quality" radius={[10, 10, 10, 10]} barSize={10}>
                {SLEEP_HISTORY.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isToday ? '#47c2eb' : '#a78bfa88'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Smart Recommendation Card */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-[#47c2eb] to-[#a78bfa] p-[2px] rounded-[2rem] shadow-lg">
          <div className="bg-white rounded-[1.9rem] p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3 items-center">
                <div className="bg-[#47c2eb]/10 p-3 rounded-2xl">
                  <Sun size={24} className="text-[#47c2eb]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Smart Wake-up</h4>
                  <p className="text-xs text-slate-400">Based on your REM cycles</p>
                </div>
              </div>
              <span className="bg-[#47c2eb]/10 text-[#47c2eb] text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">Recommended</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-3xl font-black text-slate-800">07:15 AM</span>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">5 Full Cycles</p>
                <p className="text-[10px] text-slate-400">Optimal alertness</p>
              </div>
            </div>

            <button className="w-full bg-[#47c2eb] text-white font-bold py-4 rounded-2xl shadow-[0_8px_20px_rgba(71,194,235,0.2)] active:scale-95 transition-transform">
              Set Smart Alarm
            </button>
          </div>
        </div>
      </section>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Moon size={16} />
            <span className="text-[10px] font-black uppercase tracking-tight">Deep Sleep</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-800">2h 15m</span>
            <span className="text-[10px] font-bold text-emerald-500">+12%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 text-slate-400 mb-2">
            <Timer size={16} />
            <span className="text-[10px] font-black uppercase tracking-tight">Latency</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-800">12m</span>
            <span className="text-[10px] font-bold text-emerald-500">Fast</span>
          </div>
        </div>
      </div>

      {/* Insight Insight */}
      <div className="bg-[#47c2eb]/5 border border-[#47c2eb]/10 rounded-[2rem] p-5 flex gap-4">
        <div className="bg-white w-10 h-10 min-w-[40px] rounded-2xl flex items-center justify-center text-[#47c2eb] shadow-sm">
          <Lightbulb size={20} />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          You fell asleep <span className="text-[#47c2eb] font-bold">15 mins faster</span> than usual. Reading before bed seems to be helping your relaxation score.
        </p>
      </div>
    </div>
  );
};

export default AnalysisScreen;
