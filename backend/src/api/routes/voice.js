import express from "express";
import { handleVoiceGeneration } from "../controllers/voiceController.js";

const router = express.Router();

router.post("/", handleVoiceGeneration);

export default router;
