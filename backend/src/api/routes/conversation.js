import express from "express";
import {
  createConversation,
  saveConversation,
  getConversation,
  listConversations,
  getLastConversation,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/create", createConversation);
router.post("/save", saveConversation);
router.get("/load/:id", getConversation);
router.get("/list", listConversations);
router.get("/last", getLastConversation);

export default router;
