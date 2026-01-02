
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';

interface QuizProps {
  onComplete: (answers: string[]) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
        <span className="text-[10px] font-black text-fuchsia-400 uppercase tracking-[0.2em]">
          Sequence 0{currentStep + 1}
        </span>
        <div className="w-32 h-2 bg-black rounded-full overflow-hidden border border-white/10 p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,0,255,0.5)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black leading-tight bangers-font tracking-wide text-white drop-shadow-lg">
          {currentQuestion.text}
        </h2>
        <p className="text-xs font-bold text-cyan-400/70 uppercase tracking-widest">{currentQuestion.hint}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            className="group relative bg-white/5 border border-white/10 hover:border-cyan-400/50 text-left px-8 py-6 rounded-3xl transition-all transform hover:scale-[1.02] hover:-rotate-1 active:scale-95"
          >
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-black text-[10px] text-white/20 group-hover:text-cyan-400 transition-colors">
              {idx + 1}
            </div>
            <span className="text-lg font-bold text-white/80 group-hover:text-white transition-all pl-6">
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
