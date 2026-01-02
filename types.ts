
export enum CharacterRole {
  NPC = "NPC",
  AWAKENING = "AWAKENING",
  MAIN_CHARACTER = "MAIN CHARACTER"
}

export interface AnalysisResult {
  characterType: CharacterRole;
  mainCharacterScore: number;
  uniqueness: number;
  socialAura: number;
  ambition: number;
  riskTolerance: number;
  confidence: number;
  cinematicArc: string;
  headline: string;
  subtitle: string;
  internetRank: number;
  verdict: string;
  shareCaptions: string[];
}

export interface Question {
  id: number;
  text: string;
  hint: string;
  options: string[];
}

export type ToolType = 'understanding' | 'search' | 'video' | 'image_pro' | 'edit' | 'fast_chat';

export interface GroundingSource {
  title?: string;
  uri?: string;
}
