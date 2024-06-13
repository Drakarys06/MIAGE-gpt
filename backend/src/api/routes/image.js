import express from "express";
import { handleImageGeneration } from "../controllers/imageController.js";

const router = express.Router();

router.post("/", handleImageGeneration);

export default router;
