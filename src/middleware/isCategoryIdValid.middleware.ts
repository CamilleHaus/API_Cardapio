import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const category = await prisma.category.findFirst({
      where: {
        id: id,
      },
    });

    // Procuramos se a receita existe no DB

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    res.locals.category = category;

    next();
  }
}
