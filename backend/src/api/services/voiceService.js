import OpenAI from "openai";
import { config } from "../../config/config.js";
import { getChatResponse } from "./openaiService.js";

const openai = new OpenAI({
  apiKey: config.API_KEY,
});

export const generateVoice = async (prompt) => {
  await getChatResponse(prompt);
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "fable",
    input: prompt,
  });
  return Buffer.from(await mp3.arrayBuffer());
};
