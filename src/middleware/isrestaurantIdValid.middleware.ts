import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError"

export class IsRestaurantIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = req.params.restaurantId;

    //  O Id do restaurant vem dos paramêtros de rota, ou seja, da URL nesse caso

    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: id,
      },
    });

    // Aqui procuramos o restaurante baseado no ID para saber se ele existe ou não

    if (!restaurant) {
      throw new AppError("Restaurant not found", 404);
    }

    next();
  }
}
