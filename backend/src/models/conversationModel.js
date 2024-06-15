import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    messages: [messageSchema],
  },
  { timestamps: true },
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
