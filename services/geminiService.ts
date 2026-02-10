
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProgramDescription = async (title: string, category: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate an inspiring and professional description for an NGO program titled "${title}" in the "${category}" sector for our Nepali NGO "Gramin Jan Jagaran Kendra". Focus on the unique challenges and opportunities in Nepal (e.g., remote terrain, digital divide, community spirit). Keep it under 75 words.`,
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const generateThankYouNote = async (donorName: string, amount: number, programTitle: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a heartfelt thank you letter from "Gramin Jan Jagaran Kendra" (a Nepali NGO) to ${donorName} for their donation of $${amount} to support "${programTitle}". Mention how their contribution helps build a more equitable Nepal.`,
    });
    return response.text || "Thank you for your incredible support for Nepal!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Dhanyabaad! Your contribution is making a real difference in the lives of rural Nepalis.";
  }
};

export const generateImpactReport = async (program: any): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a concise impact summary for the Nepali NGO "Gramin Jan Jagaran Kendra" program "${program.title}". Highlight the sustainable benefits for local communities in Nepal.`,
    });
    return response.text || "Our impact across Nepal is growing every day thanks to you.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Progress is being made. Join us to empower the heart of Nepal.";
  }
};
