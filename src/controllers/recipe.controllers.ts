import { inject, injectable } from "tsyringe";
import { RecipeServices } from "../services/recipe.service";
import { Request, Response } from "express";
import { TRecipe } from "../schemas/recipe.schema";

@injectable()
export class RecipeControllers {
  constructor(
    @inject("RecipeServices") private recipeServices: RecipeServices
  ) {}

  async create(req: Request, res: Response): Promise<Response<TRecipe>> {
    const { id } = res.locals.decode;

    // O id vem do middleware de verificação do token

    const response = await this.recipeServices.create(req.body, id);

    return res.status(201).json(response);
  }

  async getOne(req: Request, res: Response): Promise<Response<TRecipe>> {
    const id = req.params.id;

    // É o ID da própria rota, por isso ele vem do params

    const response = await this.recipeServices.getOne(id);

    return res.status(200).json(response);
  }

  async getMany(req: Request, res: Response): Promise<Response<TRecipe[]>> {
    const restaurantId = req.params.restaurantId;

    // É o ID da própria rota, por isso ele vem do params

    const categoryId = req.query.categoryId;

    const response = await this.recipeServices.getMany(
      restaurantId,
      categoryId ? String(categoryId) : categoryId
    );

    return res.status(200).json(response);
  }

  async update(req: Request, res: Response): Promise<Response<TRecipe>> {
    const id = req.params.id;

    // É o ID da própria rota, por isso ele vem do params

    const response = await this.recipeServices.update(req.body, id);

    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response): Promise<Response<void>> {
    const id = req.params.id;

    // É o ID da própria rota, por isso ele vem do params

    await this.recipeServices.delete(id);

    return res.status(204).json();
  }
}
