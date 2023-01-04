import { Request, Response, NextFunction } from "express";
import express from "express";
import cors from "cors";

import routes from "../api/routes";

const apiRoutePrefix = "/api";

export default (app: express.Application) => {
  // ---------- Basic Config ---------- //
  app.use(express.json());

  // ---------- Middleware ---------- //
  app.enable("trust proxy");

  // ---------- CORS ---------- //
  app.use(
    cors({
      origin: [
        "localhost:8080",
        "http://localhost:8080",
        "https://localhost:8080",
      ],
      credentials: true,
    })
  );

  // ---------- Load Routes ---------- //
  // Health Check Endpoints
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).end();
  });

  app.use(apiRoutePrefix, routes());

  // ------------ Not Found Handler ------------ //
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.statusCode = 404;
    next();
  });
};
