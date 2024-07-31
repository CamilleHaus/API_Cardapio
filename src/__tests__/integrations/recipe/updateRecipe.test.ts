import { prisma } from "../../../database/prisma";
import {
  recipeCreateBodyMock,
  restaurantRecipeCreateDataMock,
  updateRecipeDataMock,
} from "../../__mocks__/recipeMocks";
import { simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Update recipe", () => {
  test("Should be able to update a recipe successfully", async () => {
    const { restaurant, token } = await simulateLogin();

    // Como a receita está vinculada a um restaurante, precisamos estar logados
    // Essa rota necessita autorização

    const recipeData = restaurantRecipeCreateDataMock(restaurant.id);

    // Criamos uma receita com o id do restaurant

    const recipe = await prisma.recipe.create({ data: recipeData });

    const updateRecipeData = updateRecipeDataMock(null);

    // Vamos testar caso a categoryId seja nula

    const data = await request
      .patch(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateRecipeData)
      .expect(200)
      .then((response) => response.body);

    expect(data.id).toBe(recipe.id);
    expect(data.name).toBe(updateRecipeData.name);
    expect(data.price).toBe(updateRecipeData.price);
    expect(data.description).toBe(updateRecipeData.description);
    expect(data.categoryId).toBe(updateRecipeData.categoryId);
    expect(data.restaurantId).toBe(restaurant.id);
  });
});
