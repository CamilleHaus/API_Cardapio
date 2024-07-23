import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export class IsRestaurantCategoryOwner {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const restaurandId = res.locals.decode.id;

    // Na rota de login, foi quando colocamos esse ID no decode

    const category = res.locals.category;

    if (category.restaurantId !== restaurandId) {
      throw new AppError("Restaurant must be the owner of this category", 401);
    }

    // Comparamos com o restaurantId que recebemos no TOKEN

    next();
  }
}

// A Ordem que esse middleware é aplicado, importa
