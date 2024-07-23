import { Router } from "express";
import { container } from "tsyringe";
import { CategoryControllers } from "../controllers/category.controllers";
import { CategoryServices } from "../services/category.service";
import { VerifyToken } from "../middleware/verifytoken.middleware";
import { ValidateBody } from "../middleware/validateBody.middleware";
import {
  categoryCreateBodySchema,
  updateCategoryBodySchema,
} from "../schemas/category.schema";
import { IsRestaurantIdValid } from "../middleware/isrestaurantIdValid.middleware";
import { IsCategoryIdValid } from "../middleware/isCategoryIdValid.middleware";
import { IsRestaurantCategoryOwner } from "../middleware/isRestaurantCategoryOwner.middleware";

export const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);

const categoryController = container.resolve(CategoryControllers);

// Instanciação por causa do Tsyring

// POST - Rota privada - Precisa de autorização (a.k.a TOKEN)

categoryRouter.post(
  "/",
  VerifyToken.execute,
  ValidateBody.execute(categoryCreateBodySchema),
  (req, res) => categoryController.create(req, res)
);

// O restaurante precisa estar logado para poder adicionar uma categoria

// GET - Rota Pública

categoryRouter.get("/:restaurantId", IsRestaurantIdValid.execute, (req, res) =>
  categoryController.getMany(req, res)
);

// PATCH - Rota privada - Precisa de autorização (a.k.a TOKEN)

categoryRouter.patch(
  "/:id",
  VerifyToken.execute,
  ValidateBody.execute(updateCategoryBodySchema),
  IsCategoryIdValid.execute,
  IsRestaurantCategoryOwner.execute,
  (req, res) => categoryController.update(req, res)
);

// DELETE - Rota privada - Precisa de autorização (a.k.a TOKEN)

categoryRouter.delete(
  "/:id",
  VerifyToken.execute,
  IsCategoryIdValid.execute,
  IsRestaurantCategoryOwner.execute,
  (req, res) => categoryController.delete(req, res)
);
