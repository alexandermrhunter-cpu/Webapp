
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GroundingSource } from "../types";

/**
 * Standard client for basic tasks using the system-provided key.
 */
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Basic Analysis (NPC vs Main Character)
 * Uses Gemini 3 Flash for speed and cost-efficiency.
 */
export async function analyzeCharacterProfile(answers: string[]): Promise<AnalysisResult> {
  const ai = getAi();
  const model = 'gemini-3-flash-preview';
  const prompt = `Analyze this person based on these 9 answers to reveal if they are an NPC, AWAKENING, or MAIN CHARACTER: ${answers.join(", ")}. 
  Be extremely cinematic, slightly judgmental, and highly evocative. 
  Determine their scores, unique rarity, and a specific "cinematic arc" like a movie trailer description.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          characterType: { type: Type.STRING },
          mainCharacterScore: { type: Type.NUMBER },
          uniqueness: { type: Type.NUMBER },
          socialAura: { type: Type.NUMBER },
          ambition: { type: Type.NUMBER },
          riskTolerance: { type: Type.NUMBER },
          confidence: { type: Type.NUMBER },
          cinematicArc: { type: Type.STRING },
          headline: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          internetRank: { type: Type.NUMBER },
          verdict: { type: Type.STRING },
          shareCaptions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["characterType", "mainCharacterScore", "uniqueness", "socialAura", "ambition", "riskTolerance", "confidence", "cinematicArc", "headline", "subtitle", "internetRank", "verdict", "shareCaptions"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as AnalysisResult;
}

/**
 * Fast AI responses using Gemini Flash Lite
 */
export async function fastChat(prompt: string): Promise<string> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
  });
  return response.text || "";
}

/**
 * Search Grounding using Gemini 3 Flash
 */
export async function searchWithGrounding(query: string): Promise<{ text: string, sources: GroundingSource[] }> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title,
    uri: chunk.web?.uri
  })).filter((s: GroundingSource) => s.uri) || [];

  return { text: response.text || "", sources };
}

/**
 * Image/Video Understanding using Gemini 3 Pro
 */
export async function analyzeMedia(base64Data: string, mimeType: string, prompt: string): Promise<string> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: prompt }
      ]
    }
  });
  return response.text || "";
}

/**
 * Image Editing using Gemini 2.5 Flash Image
 */
export async function editImage(base64Data: string, mimeType: string, prompt: string): Promise<string | null> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: prompt }
      ]
    }
  });
  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
  return null;
}

/**
 * High-Quality Image Generation using Gemini 3 Pro Image
 * Creates a fresh instance to ensure it uses the user's latest selected API key.
 */
export async function generateProImage(prompt: string, size: "1K" | "2K" | "4K"): Promise<string | null> {
  const dynamicAi = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const response = await dynamicAi.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: [{ text: prompt }],
    config: {
      imageConfig: { aspectRatio: "1:1", imageSize: size }
    }
  });
  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
  return null;
}

/**
 * Video Generation using Veo 3.1
 * Creates a fresh instance to ensure it uses the user's latest selected API key.
 */
export async function generateVeoVideo(prompt: string, imageBase64?: string, imageMime?: string): Promise<string | null> {
  const dynamicAi = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const config: any = { 
    model: 'veo-3.1-fast-generate-preview', 
    prompt: prompt || 'A cinematic protagonist moment', 
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' } 
  };
  
  if (imageBase64 && imageMime) {
    config.image = { imageBytes: imageBase64, mimeType: imageMime };
  }

  let operation = await dynamicAi.models.generateVideos(config);
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await dynamicAi.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) return null;
  
  // Appending API Key is mandatory for download
  const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
