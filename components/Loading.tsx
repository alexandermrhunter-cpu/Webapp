
import React, { useState, useEffect } from 'react';

export const Loading: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Analyzing your vibe energy...",
    "Scanning for protagonist potential...",
    "Bypassing NPC limitations...",
    "Mapping your social aura...",
    "Consulting the AI Elders...",
    "Finalizing your character card..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [loadingTexts.length]);

  return (
    <div className="flex flex-col items-center justify-center gap-12 py-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative">
        <div className="w-32 h-32 border-4 border-cyan-400/20 rounded-full animate-[ping_2s_infinite]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-t-4 border-fuchsia-500 border-r-4 border-r-transparent rounded-full animate-spin" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl animate-bounce">🧬</div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-3 relative z-10">
        <p className="text-lg uppercase tracking-[0.2em] font-black text-white bangers-font tracking-widest animate-pulse h-8">
          {loadingTexts[textIndex]}
        </p>
        <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
        </div>
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-4">Processing Identity Core</p>
      </div>
    </div>
  );
};
