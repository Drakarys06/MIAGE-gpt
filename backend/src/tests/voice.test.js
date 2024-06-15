import request from "supertest";
import express from "express";
import { setupMiddleware } from "../core/middleware.js";
import { setupRoutes } from "../api/routes/api.js";

const app = express();
setupMiddleware(app);
setupRoutes(app);

describe("POST /speech", () => {
  it("should return a voice response from OpenAI", async () => {
    const response = await request(app)
      .post("/speech")
      .send({ prompt: "Hello, how are you?" });

    expect(response.statusCode).toBe(200);
    // additional checks can be added based on the expected response
  });
});
