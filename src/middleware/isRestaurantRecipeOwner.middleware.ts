import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError"

export class IsRestaurantRecipeOwner {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const restaurandId = res.locals.decode.id;

    // Na rota de login, foi quando colocamos esse ID no decode

    const recipe = res.locals.recipe;

    if (recipe.restaurantId !== restaurandId) {
      throw new AppError("Restaurant must be the owner of this recipe", 401);
    }

    // Comparamos com o restaurantId que recebemos no TOKEN

    next();
  }
}

// A Ordem que esse middleware é aplicado, importa
