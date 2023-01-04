// npm
import { Router } from "express";

// app
import mealsRoutes from "./meals-rt";
import authRoutes from "./auth-rt";

export default () => {
  const app = Router();

  // Add routes
  mealsRoutes(app);
  authRoutes(app);

  return app;
};
