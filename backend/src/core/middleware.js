import cors from "cors";
import multer from "multer";
import express from "express";

export const setupMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(multer().none());
};
