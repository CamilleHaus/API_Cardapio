import { inject, injectable } from "tsyringe";
import { RestaurantServices } from "../services/restaurant.service";
import { Request, Response } from "express";
import { TPublicRestaurant, TRestaurantLoginReturn, TRestaurantReturn } from "../schemas/restaurant.schema";

@injectable()
export class RestaurantControllers {

    constructor(@inject("RestaurantServices") private restaurantServices: RestaurantServices) { }

    async register(req: Request, res: Response): Promise<Response<TRestaurantReturn>> {

        const response = await this.restaurantServices.register(req.body)

        return res.status(201).json(response)
    }

    async login(req: Request, res: Response): Promise<Response<TRestaurantLoginReturn>> {

        const response = await this.restaurantServices.login(req.body)

        return res.status(200).json(response)
    }

    async update(req: Request, res: Response): Promise<Response<TRestaurantReturn>> {

        const { id } = res.locals.decode;

        // O id vem do middleware de verificação do token 

        const response = await this.restaurantServices.update(req.body, id)

        return res.status(200).json(response)
    }

    async getRestaurant(req: Request, res: Response): Promise<Response<TRestaurantReturn>> {

        const { id } = res.locals.decode;

        const response = await this.restaurantServices.getRestaurant(id)

        return res.status(200).json(response)
    }


    async getManyRestaurants(req: Request, res: Response): Promise<Response<TPublicRestaurant[]>> {

        const response = await this.restaurantServices.getManyRestaurants()

        return res.status(200).json(response)
    }
}