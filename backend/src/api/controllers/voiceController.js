import { generateVoice } from "../services/voiceService.js";
import { createResponse } from "../../models/responseModel.js";
import fs from "fs";
import path from "path";

const speechFile = path.resolve("./speech.mp3");

export const handleVoiceGeneration = async (req, res) => {
  const { prompt } = req.body;
  try {
    const buffer = await generateVoice(prompt);
    await fs.promises.writeFile(speechFile, buffer);
    res.sendFile(speechFile, (err) => {
      if (err) {
        res
          .status(500)
          .json(
            createResponse(
              false,
              "Failed to send voice file",
              null,
              err.message,
            ),
          );
      }
    });
  } catch (error) {
    res
      .status(500)
      .json(
        createResponse(
          false,
          "Failed to generate voice response",
          null,
          error.message,
        ),
      );
  }
};
