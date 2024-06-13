import chatRoutes from "./chat.js";
import imageRoutes from "./image.js";
import voiceRoutes from "./voice.js";

export const setupRoutes = (app) => {
  app.use("/chat", chatRoutes);
  app.use("/image", imageRoutes);
  app.use("/speech", voiceRoutes);
};
