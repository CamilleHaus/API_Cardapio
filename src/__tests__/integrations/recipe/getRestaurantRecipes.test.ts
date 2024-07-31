import { prisma } from "../../../database/prisma";
import { TRecipe } from "../../../schemas/recipe.schema";
import { restaurantRecipeCreateDataMock } from "../../__mocks__/recipeMocks";
import { simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Get All Restaurant Recipes", () => {
  test("Should be able to get all recipes from a restaurant successfully", async () => {
    const { restaurant } = await simulateLogin();

    // Como puxaremos a receita de um restaurante, precisamos estar logados para pegarmos o ID. Mas nao precisamos do token
    // pois a rota nao necessita autorização

    const recipeData = restaurantRecipeCreateDataMock(restaurant.id);

    // Aqui, estamos criando a receita e passando o id do restaurant que ela será associada de acordo com o Mock

    const recipeList = [recipeData, recipeData];

    // Aqui passandos o recipeData suas vezes para termos 2 objetos na lista

    await prisma.recipe.createMany({ data: recipeList });

    const data = await request
      .get(`/recipes/restaurant/${restaurant.id}`)
      .expect(200)
      .then((response) => response.body);

    expect(data).toHaveLength(recipeList.length);
    data.forEach((recipe: TRecipe) => {
      expect(recipe.id).toBeDefined();
      expect(recipe.name).toBe(recipeData.name);
      expect(recipe.price).toBe(recipeData.price);
      expect(recipe.description).toBe(recipeData.description);
      expect(recipe.restaurantId).toBe(restaurant.id);
      expect(recipe.categoryId).toBe(recipeData.categoryId);
    });
  });

  test("Should throw an error when restaurant ID is not valid", async () => {
    const data = await request
      .get(`/recipes/restaurant/727dd33c-12ff-494d-9ee6-5896e8a924b4`)
      .expect(404)
      .then((response) => response.body);

      expect(data.message).toBe("Restaurant not found");

      // Estamos testando a mensagem de retorno do Middleware
  });
});
