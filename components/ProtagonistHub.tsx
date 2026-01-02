
import React, { useState } from 'react';
import { ToolType } from '../types';
import { 
  analyzeMedia, 
  searchWithGrounding, 
  generateVeoVideo, 
  generateProImage, 
  editImage, 
  fastChat 
} from '../services/geminiService';

interface ProtagonistHubProps {onBack: () => void;}

export const ProtagonistHub: React.FC<ProtagonistHubProps> = ({ onBack }) => {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [result, setResult] = useState<any>(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<{ data: string, mime: string } | null>(null);
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");

  const tools = [
    { id: 'understanding' as ToolType, name: "Reality Scanner", desc: "AI world analysis", icon: "👁️", color: "from-blue-500 to-cyan-400" },
    { id: 'search' as ToolType, name: "Nexus Search", desc: "Live grounded knowledge", icon: "🌐", color: "from-fuchsia-600 to-purple-500" },
    { id: 'video' as ToolType, name: "Timeline Weaver", desc: "Veo 3.1 Video Gen", icon: "🎥", color: "from-orange-500 to-amber-400" },
    { id: 'image_pro' as ToolType, name: "Avatar Forge", desc: "4K Pro Image Synthesis", icon: "🎨", color: "from-emerald-500 to-teal-400" },
    { id: 'edit' as ToolType, name: "Reality Glitch", desc: "Command image alchemy", icon: "⚡", color: "from-pink-500 to-rose-400" },
    { id: 'fast_chat' as ToolType, name: "Instant Wisdom", desc: "Life-path optimization", icon: "🚀", color: "from-indigo-600 to-blue-500" },
  ];

  const handleAction = async () => {
    setLoading(true);
    setResult(null);
    setLoadingStep("Connecting to Nexus...");
    
    try {
      if (activeTool === 'understanding' && file) {
        const res = await analyzeMedia(file.data, file.mime, input || "What is in this?");
        setResult({ text: res });
      } else if (activeTool === 'search') {
        const res = await searchWithGrounding(input);
        setResult(res);
      } else if (activeTool === 'video') {
        if (!(await (window as any).aistudio.hasSelectedApiKey())) {
          await (window as any).aistudio.openSelectKey();
        }
        setLoadingStep("Weaving timeline (this takes ~1-2 mins)...");
        const res = await generateVeoVideo(input, file?.data, file?.mime);
        setResult({ video: res });
      } else if (activeTool === 'image_pro') {
        if (!(await (window as any).aistudio.hasSelectedApiKey())) {
          await (window as any).aistudio.openSelectKey();
        }
        setLoadingStep("Forging 4K artifact...");
        const res = await generateProImage(input, imageSize);
        setResult({ image: res });
      } else if (activeTool === 'edit' && file) {
        setLoadingStep("Altering reality...");
        const res = await editImage(file.data, file.mime, input);
        setResult({ image: res });
      } else if (activeTool === 'fast_chat') {
        const res = await fastChat(input);
        setResult({ text: res });
      }
    } catch (e: any) {
      if (e.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
      alert("Nexus Protocol Error: " + e.message);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center bg-white/5 p-5 rounded-[2rem] border border-white/5">
        <h2 className="text-2xl font-black uppercase tracking-tighter bangers-font text-cyan-400">Protagonist Hub</h2>
        <button onClick={onBack} className="bg-white/10 hover:bg-white/20 text-[10px] font-black px-4 py-2 rounded-full uppercase transition-all">Exit</button>
      </div>

      {!activeTool ? (
        <div className="grid grid-cols-2 gap-4">
          {tools.map(t => (
            <button key={t.id} onClick={() => setActiveTool(t.id)} className="p-5 bg-zinc-900/50 border border-white/5 rounded-[2rem] text-left hover:border-white/20 transition-all group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${t.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
              <div className="text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform">{t.icon}</div>
              <h3 className="font-black uppercase text-[11px] mb-1 tracking-widest text-white">{t.name}</h3>
              <p className="text-[8px] text-white/40 leading-relaxed uppercase font-bold">{t.desc}</p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
          <button onClick={() => {setActiveTool(null); setResult(null); setFile(null); setInput("");}} className="text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white">← Main Dashboard</button>
          
          <div className="bg-zinc-950 p-6 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl">
            <div className="flex items-center gap-4">
               <div className="text-4xl">{tools.find(t => t.id === activeTool)?.icon}</div>
               <h3 className="text-xl font-black uppercase bangers-font tracking-wider text-white">{tools.find(t => t.id === activeTool)?.name}</h3>
            </div>
            
            {(activeTool === 'understanding' || activeTool === 'video' || activeTool === 'edit') && (
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">Input Media Required</label>
                <input type="file" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const r = new FileReader();
                    r.onload = () => setFile({ data: (r.result as string).split(',')[1], mime: f.type });
                    r.readAsDataURL(f);
                  }
                }} className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl p-4 text-[10px] uppercase font-black" />
              </div>
            )}

            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter reality modification commands..." className="w-full bg-black border border-white/10 rounded-2xl p-5 text-sm text-white focus:outline-none focus:border-cyan-400/50 h-32" />

            <button disabled={loading} onClick={handleAction} className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black uppercase py-5 rounded-2xl text-[11px] tracking-[0.2em] shadow-lg shadow-cyan-500/20">
              {loading ? loadingStep : "EXECUTE COMMAND"}
            </button>
          </div>

          {result && (
            <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] animate-in zoom-in-95 duration-500 space-y-4 holographic">
              {result.text && <p className="text-xs leading-relaxed text-white/90 font-medium">{result.text}</p>}
              {result.image && <img src={result.image} className="w-full rounded-3xl border-2 border-white/10 shadow-2xl" />}
              {result.video && <video controls src={result.video} className="w-full rounded-3xl border-2 border-white/10 shadow-2xl" />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
