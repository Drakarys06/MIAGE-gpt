import { Conversation } from "../../models/conversationModel.js";

export const createConversation = async (req, res) => {
  const { title } = req.body;
  try {
    const conversation = new Conversation({ title, messages: [] });
    await conversation.save();
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create conversation",
      error: error.message,
    });
  }
};

export const saveConversation = async (req, res) => {
  const { id, messages } = req.body;
  try {
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "Conversation not found" });
    }
    conversation.messages = messages;
    await conversation.save();
    res
      .status(200)
      .json({ success: true, message: "Conversation saved successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save conversation",
      error: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  const { id } = req.params;
  try {
    const conversation = await Conversation.findById(id);
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load conversation",
      error: error.message,
    });
  }
};

export const listConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({}, "title");
    res.status(200).json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to list conversations",
      error: error.message,
    });
  }
};

export const getLastConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne().sort({ updatedAt: -1 });
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to load the last conversation",
        error: error.message,
      });
  }
};
