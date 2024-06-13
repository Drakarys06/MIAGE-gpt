import { generateImage } from "../services/dalleService.js";
import { createResponse } from "../../models/responseModel.js";

export const handleImageGeneration = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await generateImage(prompt);
    res.json(createResponse(true, "Image generated successfully", response));
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(false, "Failed to generate image", null, error.message),
      );
  }
};
