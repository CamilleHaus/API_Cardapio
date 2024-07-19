import { injectable } from "tsyringe";
import { TCategory, TCategoryCreateBody, TCategoryUpdate } from "../schemas/category.schema";
import { prisma } from "../database/prisma";

@injectable()
export class CategoryServices {

    async create(body: TCategoryCreateBody, restaurantId: string): Promise<TCategory> {

        const newCategoryData = { ...body, restaurantId };

        // Aqui justamos os dados do body com o restaurantId, para podermos passar o objeto completo na criação

        const category = await prisma.category.create({ data: newCategoryData });

        return category;
    }

    async getMany(restaurantId: string): Promise<TCategory[]> {

        const categories = await prisma.category.findMany({
            where: {
                id: restaurantId
            }
        })

        // Aqui puxamos todas as categorias de um restaurante. Ou seja, iremos fazer uma busca por todas as categorias que batem com
        // o restaurantId que estamos passando

        return categories;
    }

    async update(body: TCategoryUpdate, categoryId: string): Promise<TCategory> {

        const category = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: body
        })

        // Aqui fazemos um update da categoria ONDE o id bate com o categoryId que estamos passando no parametro

        return category
    }

    async delete(categoryId: string): Promise<void> {

        await prisma.category.delete({
            where: {
                id: categoryId
            }
        })
    }
}