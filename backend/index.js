import express from "express";
import { config } from "./src/config/config.js";
import { setupRoutes } from "./src/api/routes/index.js";
import { setupMiddleware } from "./src/core/middleware.js";

const app = express();
const port = config.PORT;

setupMiddleware(app);
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
