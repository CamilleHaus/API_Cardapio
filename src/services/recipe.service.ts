import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TRecipe, TRecipeCreateBody, TRecipeUpdateBody } from "../schemas/recipe.schema";

@injectable()
export class RecipeServices {
    async create(body: TRecipeCreateBody, restaurantId: string): Promise<TRecipe> {

        const newRecipeData = { ...body, restaurantId }

        // Aqui justamos os dados do body com o restaurantId, para podermos passar o objeto completo na criação

        const recipe = await prisma.recipe.create({ data: newRecipeData })

        return recipe
    }

    async getOne(recipeId: string) {

        const recipe = await prisma.recipe.findFirst({
            where: {
                id: recipeId
            }
        })

        return recipe
    }

    async getMany(restaurantId: string, categoryId?: string): Promise<TRecipe[]> {

        const recipes = await prisma.recipe.findMany({
            where: {
                restaurantId,
                categoryId
            }
        })

        return recipes

        // Passando no findMany os filtros de restaurantId e categoryId. Basicamente dizendo para achar onde o restaurandId = restaurantID e
        // categoryId = categoryId
    }

    async update(body: TRecipeUpdateBody, recipeId: string): Promise<TRecipe> {

        const recipe = await prisma.recipe.update({
            where: {
                id: recipeId
            },
            data: body
        })

        return recipe

        // Aqui atualizamos uma receita fazendo um update. Filtrando a receita que tiver seu recipeId igual ao do parametro, e 
        // passando o body de atualização
    }

    async delete(recipeId: string): Promise<void> {

        await prisma.recipe.delete({
            where: {
                id: recipeId
            }
        })
    }
}