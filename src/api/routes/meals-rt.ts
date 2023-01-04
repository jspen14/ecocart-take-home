// npm
import { Router } from "express";

// app
import { MealsCtrl } from "../controllers/meals-ctrl";
import jwtVerifier from "../middleware/jwt-verifier";

const route = Router();

// ------------ Routes ------------ //
export default (app: Router) => {
  // Attach middleware and mount routes
  const basePath = "/meals";
  app.use(basePath, jwtVerifier);
  app.use(basePath, route);

  route.get("/main-ingredient/:ingredient", MealsCtrl.getMeals);
};
