import chatRoutes from "./chat.js";
import imageRoutes from "./image.js";
import voiceRoutes from "./voice.js";
import conversationRoutes from "./conversation.js";

export const setupRoutes = (app) => {
  app.use("/chat", chatRoutes);
  app.use("/image", imageRoutes);
  app.use("/speech", voiceRoutes);
  app.use("/api/conversations", conversationRoutes);
};
