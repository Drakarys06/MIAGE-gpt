import request from "supertest";
import express from "express";
import { setupMiddleware } from "../core/middleware.js";
import { setupRoutes } from "../api/routes/index.js";

const app = express();
setupMiddleware(app);
setupRoutes(app);

describe("POST /chat", () => {
  it("should return a response from OpenAI", async () => {
    const response = await request(app).post("/chat").send({ prompt: "Hello" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("choices");
  });
});
