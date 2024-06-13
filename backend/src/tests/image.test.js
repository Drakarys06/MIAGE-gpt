import request from "supertest";
import express from "express";
import { setupMiddleware } from "../core/middleware.js";
import { setupRoutes } from "../api/routes/api.js";

const app = express();
setupMiddleware(app);
setupRoutes(app);

describe("POST /image", () => {
  it("should return an image response from OpenAI", async () => {
    const response = await request(app)
      .post("/image")
      .send({ prompt: "A beautiful sunset" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});
