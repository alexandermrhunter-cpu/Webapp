
import React from 'react';
import { AnalysisResult } from '../types';

interface CharacterCardProps {
  data: AnalysisResult;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ data }) => {
  const isMain = data.characterType.includes('MAIN');
  const accentColor = isMain ? 'from-fuchsia-500 to-cyan-400' : 'from-purple-500 to-indigo-600';

  return (
    <div className={`relative bg-zinc-950 p-1 rounded-[32px] aspect-[4/5] flex flex-col shadow-[0_0_50px_-12px_rgba(255,0,255,0.5)] overflow-hidden group border-2 border-white/20`}>
      {/* Holographic overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 via-transparent to-cyan-500/10 mix-blend-overlay pointer-events-none" />
      
      <div className="relative bg-zinc-950 rounded-[30px] p-6 h-full flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[9px] text-cyan-400 font-black uppercase tracking-[0.3em] mb-1">ID Verified</p>
              <h2 className={`text-4xl bangers-font tracking-widest leading-none text-transparent bg-clip-text bg-gradient-to-r ${accentColor}`}>
                {data.characterType}
              </h2>
            </div>
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${accentColor} flex items-center justify-center text-xl shadow-lg transform rotate-6`}>
              {isMain ? '👑' : '🔥'}
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="text-center border-r border-white/10 pr-4">
              <p className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${accentColor}`}>{data.mainCharacterScore}%</p>
              <p className="text-[8px] text-white/40 uppercase font-bold tracking-tighter">Power Level</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-tight text-white/90">{data.headline}</p>
              <p className="text-[9px] text-white/40 font-bold uppercase">{data.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 p-4 rounded-2xl border border-white/10 relative">
          <div className="absolute -top-2 -left-2 text-sm">✨</div>
          <p className="text-[10px] text-white/80 font-medium leading-relaxed italic">
            "{data.verdict}"
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[8px] text-fuchsia-400 font-black uppercase tracking-widest mb-1">Uniqueness</p>
                <p className="text-xs font-black">1 : {Math.floor(data.uniqueness * 840).toLocaleString()}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <p className="text-[8px] text-cyan-400 font-black uppercase tracking-widest mb-1">World Rank</p>
                <p className="text-xs font-black">TOP {100 - data.internetRank}%</p>
            </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-[8px] text-white/20 font-black uppercase tracking-[0.5em]">NPCORMAINCHARACTER.COM</p>
        </div>
      </div>
    </div>
  );
};
