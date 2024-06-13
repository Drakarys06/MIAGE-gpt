import OpenAI from "openai";
import { config } from "../../config/config.js";

const openai = new OpenAI({
  apiKey: config.API_KEY,
});

export const generateImage = async (prompt) => {
  return openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
};
