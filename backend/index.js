import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { setupRoutes } from "./src/api/routes/api.js";
import { setupMiddleware } from "./src/core/middleware.js";

dotenv.config();

const app = express();
const port = 3001;

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log("Error connecting to MongoDB: ", e));

setupMiddleware(app);
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
