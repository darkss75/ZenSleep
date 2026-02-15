
import React, { useState } from 'react';
import { Alarm as AlarmIcon, Psychology, Backspace } from '../icons.tsx';
import { Delete } from 'lucide-react';

interface Props {
  onFinish: () => void;
}

const MissionScreen: React.FC<Props> = ({ onFinish }) => {
  const [num1] = useState(24);
  const [num2] = useState(58);
  const answer = num1 + num2;
  const [userInput, setUserInput] = useState('');

  const handleKeyClick = (val: string) => {
    if (userInput.length < 3) {
      setUserInput(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    setUserInput(prev => prev.slice(0, -1));
  };

  const handleOk = () => {
    if (parseInt(userInput) === answer) {
      onFinish();
    } else {
      alert('Try again!');
      setUserInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 py-16 bg-gradient-to-br from-[#FF9D6C] via-[#FF5E9B] to-[#FFD93D] relative overflow-hidden animate-in fade-in duration-500">
      {/* Top Header */}
      <div className="text-center space-y-2 z-10">
        <span className="text-white/80 text-sm font-bold tracking-[0.2em] uppercase">Good Morning</span>
        <h1 className="text-white text-6xl font-black tracking-tighter animate-pulse">WAKE UP!</h1>
        <div className="flex justify-center items-center gap-2 text-white/90">
          <AlarmIcon size={20} className="text-white" />
          <span className="text-xl font-semibold">07:30 AM</span>
        </div>
      </div>

      {/* Mission Card */}
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center gap-6 z-10">
        <div className="bg-[#47c2eb]/20 p-4 rounded-full">
          <Psychology className="w-10 h-10 text-[#47c2eb]" />
        </div>
        
        <div className="text-center">
          <h2 className="text-slate-800 text-xl font-extrabold">Mental Wake-up Mission</h2>
          <p className="text-slate-500 text-sm mt-1">Solve this math problem to dismiss</p>
        </div>

        <div className="flex flex-col items-center py-4">
          <div className="text-slate-900 text-5xl font-black tracking-tight">
            {num1} + {num2} = ?
          </div>
          
          <div className="mt-8 w-40 h-16 bg-white border-b-4 border-[#47c2eb] rounded-2xl flex items-center justify-center shadow-inner">
            <span className="text-[#47c2eb] text-4xl font-bold tracking-[0.2em]">
              {userInput.split('').map(char => char).join(' ') || '_ _'}
            </span>
          </div>
        </div>
      </div>

      {/* Keypad */}
      <div className="w-full max-w-xs space-y-10 z-10">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button 
              key={num}
              onClick={() => handleKeyClick(num.toString())}
              className="h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white text-2xl font-bold active:bg-white/40 transition-colors shadow-sm"
            >
              {num}
            </button>
          ))}
          <button 
            onClick={handleBackspace}
            className="h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white text-2xl font-bold flex items-center justify-center active:bg-white/40 shadow-sm"
          >
            <Delete size={24} />
          </button>
          <button 
            onClick={() => handleKeyClick('0')}
            className="h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white text-2xl font-bold active:bg-white/40 shadow-sm"
          >
            0
          </button>
          <button 
            onClick={handleOk}
            className="h-14 rounded-2xl bg-[#47c2eb] text-white text-lg font-black active:scale-95 transition-transform shadow-[0_8px_20px_rgba(71,194,235,0.4)]"
          >
            OK
          </button>
        </div>

        {/* Snooze */}
        <button className="w-full flex flex-col items-center gap-1 group opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">Feeling tired?</span>
          <span className="text-white text-xl font-bold border-b-2 border-transparent group-hover:border-white transition-all">Snooze (5:00)</span>
        </button>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-yellow-300/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

export default MissionScreen;
