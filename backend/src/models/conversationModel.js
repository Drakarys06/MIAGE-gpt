import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  messages: [
    {
      sender: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const Conversation = mongoose.model("Conversation", conversationSchema);
