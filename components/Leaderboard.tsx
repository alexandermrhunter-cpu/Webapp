
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';

interface LeaderboardProps {
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter">The Rare Ones</h2>
        <button onClick={onBack} className="text-xs text-white/40 uppercase hover:text-white">Close</button>
      </div>

      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((item, i) => (
          <div 
            key={i} 
            className={`flex justify-between items-center p-4 rounded-xl border ${i === 0 ? 'border-white bg-white/10' : 'border-white/5 bg-zinc-900/30'}`}
          >
            <div>
              <p className="text-sm font-bold">{item.name}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.role}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black">{item.score}% Power</p>
              <p className="text-[10px] text-white/40 uppercase">{item.rarity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center p-8 border border-white/10 rounded-2xl">
        <p className="text-sm text-white/60 mb-4 italic">
          "The leaderboard updates as the population awakens."
        </p>
        <button 
          onClick={onBack}
          className="bg-white text-black font-bold py-4 px-8 rounded-xl text-xs uppercase tracking-widest"
        >
          Take the Test
        </button>
      </div>
    </div>
  );
};
