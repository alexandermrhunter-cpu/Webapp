
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen playful-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="scanline" />
      {/* Background blobs for playfulness */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px] animate-pulse" />
      
      <div className="w-full max-w-lg z-10">
        {children}
      </div>
      <footer className="mt-8 text-white/40 text-[10px] uppercase tracking-[0.4em] font-black text-center">
        Built for the <span className="text-fuchsia-400">Elite</span> Protagonist
      </footer>
    </div>
  );
};
