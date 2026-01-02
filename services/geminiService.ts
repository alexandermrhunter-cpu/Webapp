import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, GroundingSource } from "../types";

/**
 * Standard client using the injected API key.
 */
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * CORE ANALYSIS: Character Profile Generation
 */
export async function analyzeCharacterProfile(answers: string[]): Promise<AnalysisResult> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `PERSONA DATA: ${answers.join(" | ")}. TASK: Determine if this person is NPC, AWAKENING, or MAIN CHARACTER. Output a cinematic breakdown.`,
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
 * REALITY TOOLS: Search with Grounding
 */
export async function searchWithGrounding(query: string): Promise<{ text: string, sources: GroundingSource[] }> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: { tools: [{ googleSearch: {} }] },
  });

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title,
    uri: chunk.web?.uri
  })).filter((s: GroundingSource) => s.uri) || [];

  return { text: response.text || "", sources };
}

/**
 * REALITY TOOLS: Vision Understanding
 */
export async function analyzeMedia(base64Data: string, mimeType: string, prompt: string): Promise<string> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [{ inlineData: { data: base64Data, mimeType } }, { text: prompt }] }
  });
  return response.text || "";
}

/**
 * REALITY TOOLS: 4K Pro Image Forge (Dynamic Key Selection)
 */
export async function generateProImage(prompt: string, size: "1K" | "2K" | "4K"): Promise<string | null> {
  const dynamicAi = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const response = await dynamicAi.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: [{ text: prompt }],
    config: { imageConfig: { aspectRatio: "1:1", imageSize: size } }
  });
  const imgPart = response.candidates?.[0]?.content.parts.find(p => p.inlineData);
  return imgPart ? `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}` : null;
}

/**
 * REALITY TOOLS: Veo 3.1 Video Gen (Dynamic Key Selection)
 */
export async function generateVeoVideo(prompt: string, imageBase64?: string, imageMime?: string): Promise<string | null> {
  const dynamicAi = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const payload: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt || 'A protagonist cinematic reveal',
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
  };
  if (imageBase64) payload.image = { imageBytes: imageBase64, mimeType: imageMime };

  let op = await dynamicAi.models.generateVideos(payload);
  while (!op.done) {
    await new Promise(r => setTimeout(r, 10000));
    op = await dynamicAi.operations.getVideosOperation({ operation: op });
  }

  const uri = op.response?.generatedVideos?.[0]?.video?.uri;
  if (!uri) return null;
  const res = await fetch(`${uri}&key=${process.env.API_KEY}`);
  return URL.createObjectURL(await res.blob());
}

/**
 * REALITY TOOLS: Reality Glitch (Image Editing)
 */
export async function editImage(base64Data: string, mimeType: string, prompt: string): Promise<string | null> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ inlineData: { data: base64Data, mimeType } }, { text: prompt }] }
  });
  const imgPart = response.candidates?.[0]?.content.parts.find(p => p.inlineData);
  return imgPart ? `data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}` : null;
}

/**
 * REALITY TOOLS: Fast AI Oracle
 */
export async function fastChat(prompt: string): Promise<string> {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-lite-latest',
    contents: prompt,
  });
  return response.text || "";
}