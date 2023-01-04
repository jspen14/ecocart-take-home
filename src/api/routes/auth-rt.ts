// npm
import { Router } from "express";

// app
import { AuthCtrl } from "../controllers/auth-ctrl";

const route = Router();

// ------------ Routes ------------ //
export default (app: Router) => {
  // Mount routes
  const basePath = "/auth";
  app.use(basePath, route);

  route.post("/login", AuthCtrl.login);
};
