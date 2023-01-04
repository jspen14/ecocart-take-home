import axios from "axios";

import {
  MealOverview,
  MealOverviewResponse,
  DetailedMeal,
  DetailedMealResponse,
  Ingredient,
} from "../types/meals-types";

export default class MealsService {
  static async getMeals(
    mainIngredient: string
  ): Promise<DetailedMeal[] | null> {
    let mealOverviews = await this.getMealsByMainIngredient(mainIngredient);

    if (!mealOverviews) {
      return null;
    }

    let detailedMeals: DetailedMeal[] = [];

    for (let meal of mealOverviews) {
      const detailedMeal = await this.getDetailedMeal(meal.idMeal);

      if (detailedMeal) {
        detailedMeals.push(detailedMeal);
      }
    }

    return detailedMeals;
  }

  private static async getMealsByMainIngredient(
    mainIngredient: string
  ): Promise<MealOverview[] | null> {
    const res = await axios.get<MealOverviewResponse>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`
    );

    if (res.status !== 200 || !res.data?.meals) {
      return null;
    }

    return res.data.meals;
  }

  private static async getDetailedMeal(
    mealID: string
  ): Promise<DetailedMeal | null> {
    const res = await axios.get<DetailedMealResponse>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );

    if (res.status !== 200 || res.data.meals.length !== 1) {
      return null;
    }

    const mealResponse = res.data.meals[0];

    let tags: string[] = [];
    if (mealResponse.strTags) {
      tags = mealResponse.strTags.split(",");
    }

    let counter = 0;
    let ingredients: Ingredient[] = [];

    while (true) {
      counter++;
      const ingredientKey = `strIngredient${counter}`;
      const ingredientValue = (mealResponse as any)[ingredientKey];

      //  Continue while ingredient is not empty string
      if (ingredientValue) {
        const measureKey = `strMeasure${counter}`;
        const measureValue = (mealResponse as any)[measureKey];

        const ingredient: Ingredient = {
          ingredient: ingredientValue,
          measurement: measureValue,
        };

        ingredients.push(ingredient);
      } else {
        break;
      }
    }

    let detailedMeal: DetailedMeal = {
      id: parseInt(mealResponse.idMeal),
      name: mealResponse.strMeal,
      instructions: mealResponse.strInstructions,
      thumbUrl: mealResponse.strMealThumb,
      tags,
      youtubeUrl: mealResponse.strYoutube,
      ingredients,
    };

    return detailedMeal;
  }
}

export { MealsService };
