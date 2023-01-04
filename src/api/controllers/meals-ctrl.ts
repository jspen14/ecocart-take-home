// npm
import { Request, Response } from "express";

// app
import MealsService from "../../services/meals-svc";

class MealsCtrl {
  static async getMeals(req: Request, res: Response) {
    const mainIngredient = req.params.ingredient;

    const meals = await MealsService.getMeals(mainIngredient);

    if (meals) {
      return res.json(meals);
    } else {
      return res.status(404).json({
        message: "main ingredient not found",
      });
    }
  }
}

export { MealsCtrl };
