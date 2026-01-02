
import React from 'react';

interface LandingProps {
  onStart: () => void;
  onViewLeaderboard: () => void;
  onViewHub: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart, onViewLeaderboard, onViewHub }) => {
  return (
    <div className="text-center relative">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-4 text-4xl floating opacity-80">
        <span>🚀</span><span>💎</span><span>👑</span>
      </div>
      
      <p className="text-cyan-400 text-[10px] mb-4 uppercase tracking-[0.5em] font-black">
        Identity Protocol 2025 // ACTIVE
      </p>
      
      <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none bangers-font tracking-wider italic">
        <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">MAIN</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 drop-shadow-[0_0_20px_rgba(245,40,145,0.8)]">CHARACTER</span>
      </h1>
      
      <p className="text-lg md:text-xl text-white/70 mb-12 font-bold max-w-md mx-auto leading-relaxed">
        Are you the <span className="text-cyan-300">hero</span> of your own movie, or just <span className="text-white/40">walking scenery</span>?
      </p>
      
      <div className="flex flex-col gap-5">
        <button 
          onClick={onStart}
          className="glow-button bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-black py-6 rounded-3xl text-xl uppercase tracking-[0.2em] transition-all transform hover:rotate-[-1deg]"
        >
          Begin Identity Scan
        </button>
        
        <div className="flex gap-3">
          <button 
            onClick={onViewHub}
            className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all"
          >
            Reality Tools
          </button>
          <button 
            onClick={onViewLeaderboard}
            className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white/60 hover:text-white py-4 rounded-2xl text-[10px] uppercase tracking-widest transition-all"
          >
            Leaderboard
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <h3 className="text-[10px] font-black uppercase mb-1 text-fuchsia-400 tracking-tighter">Energy Scan</h3>
          <p className="text-[10px] text-white/50 leading-tight">Quantify your protagonist energy vs the crowd.</p>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <h3 className="text-[10px] font-black uppercase mb-1 text-cyan-400 tracking-tighter">Vibe Check</h3>
          <p className="text-[10px] text-white/50 leading-tight">Unlock pro-tier AI generation and reality warping.</p>
        </div>
      </div>
    </div>
  );
};
