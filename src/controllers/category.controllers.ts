import { inject, injectable } from "tsyringe";
import { CategoryServices } from "../services/category.service";
import { TCategory } from "../schemas/category.schema";
import { Request, Response } from "express";

@injectable()
export class CategoryControllers {

    constructor(@inject("CategoryServices") private categoryServices: CategoryServices) { }

    async create(req: Request, res: Response): Promise<Response<TCategory>> {
        const { id } = res.locals.decode;

        // O id vem do middleware de verificação do token 

        const response = await this.categoryServices.create(req.body, id);

        return res.status(201).json(response)
    }

    async getMany(req: Request, res: Response): Promise<Response<TCategory[]>> {
        const restaurantId = req.params.id;

        // Como essa rota é pública e especifica para um restaurante, o ID vem do params e nao do locals. 

        const response = await this.categoryServices.getMany(restaurantId);

        return res.status(200).json(response)
    }

    async update(req: Request, res: Response): Promise<Response<TCategory>> {
        const categoryId = req.params.id;

        const response = await this.categoryServices.update(req.body, categoryId);

        return res.status(201).json(response)
    }

    async delete(req: Request, res: Response): Promise<Response<void>> {
        const id = req.params.id;

        await this.categoryServices.delete(id);

        return res.status(204).json()
    }

}