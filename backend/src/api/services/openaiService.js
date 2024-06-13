import OpenAI from "openai";
import { config } from "../../config/config.js";

const openai = new OpenAI({
  apiKey: config.API_KEY,
});

export const getChatResponse = async (prompt) => {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
};
