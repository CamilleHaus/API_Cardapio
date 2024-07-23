import { Router } from "express";
import { container } from "tsyringe";
import { RecipeControllers } from "../controllers/recipe.controllers";
import { RecipeServices } from "../services/recipe.service";
import { ValidateBody } from "../middleware/validateBody.middleware";
import {
  recipeCreateBodySchema,
  recipeUpdateBodySchema,
} from "../schemas/recipe.schema";
import { VerifyToken } from "../middleware/verifytoken.middleware";
import { IsRestaurantIdValid } from "../middleware/isrestaurantIdValid.middleware";
import { IsRecipeIdValid } from "../middleware/isRecipeIdValid.middleware";
import { IsRestaurantRecipeOwner } from "../middleware/isRestaurantRecipeOwner.middleware";

export const recipeRouter = Router();

container.registerSingleton("RecipeServices", RecipeServices);

const recipeController = container.resolve(RecipeControllers);

// Instanciação por causa do Tsyring

// POST - Rota privada - Precisa de autorização (a.k.a TOKEN)

recipeRouter.post(
  "/",
  ValidateBody.execute(recipeCreateBodySchema),
  VerifyToken.execute,
  (req, res) => recipeController.create(req, res)
);

// GET - Rota pública

recipeRouter.get("/:id", IsRecipeIdValid.execute, (req, res) =>
  recipeController.getOne(req, res)
);

recipeRouter.get(
  "/restaurant/:restaurantId",
  IsRestaurantIdValid.execute,
  (req, res) => recipeController.getMany(req, res)
);

// PATCH - Rota privada - Precisa de autorização (a.k.a TOKEN)

recipeRouter.patch(
  "/:id",
  ValidateBody.execute(recipeUpdateBodySchema),
  VerifyToken.execute,
  IsRecipeIdValid.execute,
  IsRestaurantRecipeOwner.execute,
  (req, res) => recipeController.update(req, res)
);

// DELETE - Rota privada - Precisa de autorização (a.k.a TOKEN)

recipeRouter.delete(
  "/:id",
  VerifyToken.execute,
  IsRecipeIdValid.execute,
  IsRestaurantRecipeOwner.execute,
  (req, res) => recipeController.delete(req, res)
);
