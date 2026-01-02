
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { CharacterCard } from './CharacterCard';

interface ResultsProps {
  data: AnalysisResult;
  onReset: () => void;
  onViewHub: () => void;
}

export const Results: React.FC<ResultsProps> = ({ data, onReset, onViewHub }) => {
  const currentUrl = window.location.origin;
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const showToast = (message: string) => {
    setCopyStatus(message);
    setTimeout(() => setCopyStatus(null), 3000);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast(`${label} Copied!`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = (caption: string) => {
    const fullMessage = `${caption}\n\nFind your role at: ${currentUrl}`;
    copyToClipboard(fullMessage, "Link");
  };

  const shareOnX = (caption: string) => {
    const text = encodeURIComponent(`${caption}\n\nFind your role:`);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleChallengeFriends = () => {
    const caption = data.shareCaptions[0] || "I just found out my internet role. Am I the Main Character or an NPC?";
    const message = `🚨 I just got analyzed. Results: ${data.characterType} (${data.mainCharacterScore}% power).\n\n"${data.verdict}"\n\nI challenge you to find your role: ${currentUrl}`;
    copyToClipboard(message, "Challenge Post");
  };

  const copyForTikTok = () => {
    const caption = data.shareCaptions[1] || data.shareCaptions[0] || "Are you a Main Character or an NPC?";
    copyToClipboard(`${caption}\n\n#maincharacter #npcenergy #aichallenge #personalitytest\n\nLink in bio: ${currentUrl}`, "TikTok Script");
  };

  return (
    <div className="flex flex-col gap-10 py-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
      {/* Cinematic Toast Notification */}
      {copyStatus && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white text-black text-[10px] font-black px-6 py-3 rounded-full uppercase tracking-[0.2em] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {copyStatus}
        </div>
      )}

      <div className="text-center space-y-2">
        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">Identity Verified</p>
        <h2 className="text-5xl font-black uppercase tracking-tighter leading-tight">
          {data.characterType === 'NPC' ? 'The Support' : 
           data.characterType === 'AWAKENING' ? 'The Rising Hero' : 
           'The Lead'}
        </h2>
        <p className="text-white/60 text-sm">
          Subject ranks in the top <span className="text-white font-bold">{100 - data.internetRank}%</span> of analyzed profiles.
        </p>
      </div>

      {/* Prominent Card Display */}
      <div className="relative group max-w-sm mx-auto w-full">
        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <CharacterCard data={data} />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-6 py-2 rounded-full opacity-100 uppercase tracking-widest whitespace-nowrap shadow-2xl border border-black/10">
          Screenshot Your Identity
        </div>
      </div>

      {/* PROTAGONIST HUB CTA - Primary Interactive Element */}
      <div className="mt-6 p-1 rounded-2xl bg-gradient-to-br from-white/20 to-transparent">
        <div className="bg-black rounded-xl p-6 border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-xl">
              👁️
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest">Protagonist Privileges Unlocked</h3>
              <p className="text-[10px] text-white/40 uppercase">Reality warping tools now available</p>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            As a <span className="text-white font-bold uppercase">{data.characterType}</span>, you have gained access to the Nexus Search, Reality Scanner, and Timeline Weaver.
          </p>
          <button 
            onClick={onViewHub}
            className="w-full bg-white text-black font-black uppercase py-4 rounded-xl text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-glow"
          >
            Enter Protagonist Hub
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <h3 className="text-[10px] font-bold uppercase text-white/40 mb-3 tracking-[0.2em]">Narrative Log</h3>
          <p className="text-sm leading-relaxed text-white/80 relative z-10">
            {data.cinematicArc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/5">
            <p className="text-[9px] text-white/40 uppercase mb-2 tracking-widest">Agency Level</p>
            <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ width: `${data.ambition}%` }} />
                </div>
                <span className="text-[10px] font-bold text-white/80">{data.ambition}%</span>
            </div>
          </div>
          <div className="bg-zinc-900/30 p-4 rounded-xl border border-white/5">
            <p className="text-[9px] text-white/40 uppercase mb-2 tracking-widest">Social Aura</p>
            <div className="flex items-center gap-3">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ width: `${data.socialAura}%` }} />
                </div>
                <span className="text-[10px] font-bold text-white/80">{data.socialAura}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIRAL LOOP SECTION */}
      <div className="flex flex-col gap-4 pt-10 border-t border-white/10">
        <div className="text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-2">Expansion Protocol</p>
          <h3 className="text-xl font-black uppercase tracking-tight italic">Spread the Awakening</h3>
          <p className="text-xs text-white/40">Expose their true identity to the network.</p>
        </div>

        <button 
          onClick={handleChallengeFriends}
          className="bg-zinc-900 hover:bg-zinc-800 text-white border border-white/20 font-black py-5 rounded-2xl text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95"
        >
          Challenge Your Circle
        </button>
        
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button 
            onClick={() => shareOnX(data.shareCaptions[0])}
            className="bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <span>X / Twitter</span>
          </button>
          <button 
            onClick={copyForTikTok}
            className="bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 text-white font-bold py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <span>TikTok Script</span>
          </button>
        </div>

        <div className="space-y-2 mt-4">
          <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] text-center mb-2">Pre-Written Broadcasts</p>
          {data.shareCaptions.map((caption, i) => (
            <button 
              key={i}
              onClick={() => handleShare(caption)}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-left p-4 rounded-xl transition-all flex justify-between items-center group active:bg-white/20"
            >
              <span className="truncate pr-4 italic text-white/70">"{caption}"</span>
              <span className="text-[8px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white text-black px-2 py-1 rounded">Copy</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 border border-dashed border-white/20 p-8 rounded-2xl text-center space-y-4">
        <div className="flex justify-center">
            <div className="px-3 py-1 bg-white/10 rounded-full text-[9px] uppercase tracking-widest font-bold">Limited Access</div>
        </div>
        <p className="text-sm font-bold italic">"Your destiny is malleable. Upgrade to rewrite it."</p>
        <button className="bg-white text-black text-[10px] font-black uppercase px-6 py-3 rounded-full glow-button shadow-glow">
          Unlock 30-Day Evolution ($4.99)
        </button>
        <p className="text-[9px] text-white/20 uppercase">Includes Life Path Unlock & AI Prediction Engine</p>
      </div>

      <button 
        onClick={onReset}
        className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest py-4 transition-colors text-center"
      >
        Reset Profile Scan
      </button>
    </div>
  );
};
