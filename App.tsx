
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Landing } from './components/Landing';
import { Quiz } from './components/Quiz';
import { Loading } from './components/Loading';
import { Results } from './components/Results';
import { Leaderboard } from './components/Leaderboard';
import { ProtagonistHub } from './components/ProtagonistHub';
import { analyzeCharacterProfile } from './services/geminiService';
import { AnalysisResult } from './types';

enum AppState {
  LANDING,
  LEADERBOARD,
  HUB,
  QUIZ,
  LOADING,
  RESULTS
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LANDING);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const startQuiz = () => setState(AppState.QUIZ);
  const showLeaderboard = () => setState(AppState.LEADERBOARD);
  const showHub = () => setState(AppState.HUB);
  const showLanding = () => setState(AppState.LANDING);

  const handleQuizComplete = async (answers: string[]) => {
    setState(AppState.LOADING);
    try {
      const analysis = await analyzeCharacterProfile(answers);
      setResult(analysis);
      setState(AppState.RESULTS);
    } catch (error) {
      console.error(error);
      alert("Something went wrong during analysis. Please try again.");
      setState(AppState.LANDING);
    }
  };

  const handleReset = () => {
    setResult(null);
    setState(AppState.LANDING);
  };

  return (
    <Layout>
      {state === AppState.LANDING && (
        <Landing onStart={startQuiz} onViewLeaderboard={showLeaderboard} onViewHub={showHub} />
      )}
      {state === AppState.LEADERBOARD && (
        <Leaderboard onBack={showLanding} />
      )}
      {state === AppState.HUB && (
        <ProtagonistHub onBack={showLanding} />
      )}
      {state === AppState.QUIZ && (
        <Quiz onComplete={handleQuizComplete} />
      )}
      {state === AppState.LOADING && (
        <Loading />
      )}
      {state === AppState.RESULTS && result && (
        <Results data={result} onReset={handleReset} onViewHub={showHub} />
      )}
    </Layout>
  );
};

export default App;
