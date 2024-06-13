import { getChatResponse } from "../services/openaiService.js";
import { createResponse } from "../../models/responseModel.js";

export const handleChat = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await getChatResponse(prompt);
    res.json(
      createResponse(true, "Chat response generated successfully", response),
    );
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          "Failed to generate chat response",
          null,
          error.message,
        ),
      );
  }
};
