import express from "express";
import {
  saveConversation,
  getConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/save", saveConversation);
router.get("/load", getConversation);

export default router;
