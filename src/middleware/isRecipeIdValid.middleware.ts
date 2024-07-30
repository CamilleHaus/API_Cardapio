import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError"

export class IsRecipeIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        
        const id = req.params.id;

        const recipe = await prisma.recipe.findFirst({
            where: {
                id: id
            }
        })

        // Procuramos se a receita existe no DB

        if(!recipe) {
            throw new AppError("Recipe not found", 404)
        }

        res.locals.recipe = recipe;

        // Vamos armazenar aqui para usarmos no middleware de isRestaurantRecipeOwner e não precisarmos rodar outra busca

        next();
    }
}