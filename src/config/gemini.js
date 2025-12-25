import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI();

export async function generateResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("✅ AI Response:", text); // DEBUG
    return text;
  } catch (error) {
    console.error("❌ Gemini Error:", error); // DEBUG
    throw error; // Let Main.jsx handle it
  }
}

