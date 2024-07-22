import { Router } from "express";
import { container } from "tsyringe";
import { RestaurantServices } from "../services/restaurant.service";
import { RestaurantControllers } from "../controllers/restaurant.controllers";
import { ValidateBody } from "../middleware/validateBody.middleware";
import {
  restaurantLoginSchema,
  restaurantRegisterBodySchema,
} from "../schemas/restaurant.schema";
import { VerifyToken } from "../middleware/verifytoken.middleware";

export const restaurantRouter = Router();

container.registerSingleton("RestaurantServices", RestaurantServices);

const restaurantController = container.resolve(RestaurantControllers);

// Instanciação por causa do Tsyring

// POST

restaurantRouter.post(
  "/",
  ValidateBody.execute(restaurantRegisterBodySchema),
  (req, res) => restaurantController.register(req, res)
);
restaurantRouter.post(
  "/login",
  ValidateBody.execute(restaurantLoginSchema),
  (req, res) => restaurantController.login(req, res)
);

// GET - Rota privada - Precisa de autorização (a.k.a TOKEN)

restaurantRouter.get("/profile", VerifyToken.execute, (req, res) =>
  restaurantController.getRestaurant(req, res)
);

// GET - Rota pública

restaurantRouter.get("/", (req, res) =>
  restaurantController.getManyRestaurants(req, res)
);

// PATCH - Rota privada - Precisa de autorização (a.k.a TOKEN)

restaurantRouter.patch("/", VerifyToken.execute, (req, res) =>
  restaurantController.update(req, res)
);
