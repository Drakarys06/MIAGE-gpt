import { Conversation } from "../../models/conversationModel.js";

export const saveConversation = async (req, res) => {
  const { messages } = req.body;
  try {
    let conversation = await Conversation.findOne({});
    if (!conversation) {
      conversation = new Conversation({ messages });
    } else {
      conversation.messages = messages;
    }
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
  try {
    const conversation = await Conversation.findOne({});
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load conversation",
      error: error.message,
    });
  }
};
