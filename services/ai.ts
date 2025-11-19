
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { COVERS, AI_PERSONA } from '../constants';
import { AnalysisResult, ChatMessage } from '../types';

// Initialize Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Helper to extract JSON from Markdown code blocks or raw text
 */
function cleanJSON(text: string): string {
  // Match JSON object block even if wrapped in markdown
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? jsonMatch[0] : text;
}

/**
 * Service for handling all AI interactions.
 * Decouples prompt engineering from UI logic.
 */
export const AIService = {
  
  /**
   * Uses Gemini 3 Pro Preview (Thinking Mode) to analyze a patio photo.
   * DOMAIN SPECIFIC: Analyzes "Negative Space" and "Emotional Weight".
   */
  analyzePatio: async (base64Data: string, mimeType: string): Promise<AnalysisResult> => {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            },
            {
              text: `You are The Vibe Auditor for 'Castaway Frames', a high-end furniture cover brand.
              
              YOUR PERSONA: ${AI_PERSONA.tone}
              YOUR MISSION: Analyze this outdoor space not just for objects, but for its spiritual emptiness.
              
              STEPS:
              1. Identify the architectural style (e.g., Brutalist, Mid-Century, Suburban Despair).
              2. Analyze the lighting to determine the 'mood' (e.g., Melancholy, Hopeful, Sterilized).
              3. Deduce what kind of furniture *should* be there, but isn't.
              
              OUTPUT REQUIREMENTS:
              - 'vibe': A 2-3 word abstract aesthetic description (e.g., "Liminal Concrete", "Vegetal Decay").
              - 'dimensions': Estimated dimensions of the empty space suitable for a cover.
              - 'color': A hex code that matches the lighting mood.
              - 'philosophy': A witty, slightly absurd philosophical observation about the void in this image.
              
              Return ONLY the JSON object.`
            }
          ]
        }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibe: { type: Type.STRING },
            dimensions: { type: Type.STRING },
            color: { type: Type.STRING },
            philosophy: { type: Type.STRING },
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI returned empty response");
    
    try {
      return JSON.parse(cleanJSON(text)) as AnalysisResult;
    } catch (e) {
      console.error("Failed to parse AI response", text);
      throw new Error("The AI's thoughts were too abstract to parse.");
    }
  },

  /**
   * Uses Gemini 2.5 Flash Image (Nano Banana) to edit the reality of the photo.
   * DOMAIN SPECIFIC: Enforces high-quality material textures (Canvas/Acrylic) to avoid "plastic" looking AI gen.
   */
  generateReality: async (base64Data: string, mimeType: string, userPrompt: string): Promise<string> => {
    
    // We wrap the user's prompt in a "Brand Filter" to ensure quality.
    const engineeredPrompt = `
      Photorealistic architectural rendering. 
      Task: ${userPrompt}. 
      
      CRITICAL MATERIAL SPECS:
      - Fabric must look like ${AI_PERSONA.materialSpecs}
      - Natural draping, heavy weight cloth physics.
      - Matte finish, no plastic shine.
      - Cinematic lighting matching the source image.
      - High fidelity textures.
      
      Make it look like a high-end editorial shot for 'Castaway Frames'.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType, 
            },
          },
          {
            text: engineeredPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    const imgPart = response.candidates?.[0]?.content?.parts?.[0];
    if (imgPart && imgPart.inlineData) {
      return `data:image/png;base64,${imgPart.inlineData.data}`;
    }
    throw new Error("Failed to generate image");
  },

  /**
   * Uses Gemini 3 Pro with Search Grounding for the Concierge Chatbot.
   * DOMAIN SPECIFIC: Injects the "Manifesto" and strictly enforces the "Curator" persona.
   */
  chatWithCurator: async (history: ChatMessage[], newMessage: string): Promise<{ text: string, groundingMetadata?: any }> => {
    
    const inventoryContext = JSON.stringify(COVERS.map(c => ({
      name: c.name,
      type: c.type,
      description: c.description,
      dimensions: c.type === 'CHAIR' ? "32\"W x 35\"D x 30\"H" : c.type === 'SOFA' ? "84\"W x 35\"D x 30\"H" : "48\" Round x 29\"H", 
      priceRange: c.furnitureOptions.map(f => f.price).join(", "),
      materials: c.furnitureOptions.map(f => f.material).join(", ")
    })));

    const systemInstruction = `
      You are "${AI_PERSONA.name}", the AI concierge for 'Castaway Frames'.
      
      YOUR DNA:
      - Tone: ${AI_PERSONA.tone}
      - Beliefs: ${AI_PERSONA.manifesto}
      
      YOUR KNOWLEDGE BASE:
      ${inventoryContext}
      
      INSTRUCTIONS:
      1. Never be overly cheerful. Be helpful, but maintain a cool, detached authority.
      2. If asked about competitors, dismiss them as "pedestrian" or "impermanent".
      3. If asked about price, reframe it as an investment in "visual silence" or "legacy".
      4. Use Google Search ONLY if the user asks about specific 3rd party furniture dimensions (e.g. "Will this fit my IKEA Applaro?").
      5. Always imply that the cover is more valuable than the furniture inside it.
    `;

    const chatContent = history.filter(m => !m.isThinking).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    
    chatContent.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: chatContent,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 2048 },
        tools: [{ googleSearch: {} }]
      }
    });

    return {
      text: response.text || "The void offers no answer at this time.",
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  }
};
