import { prisma } from "../../../database/prisma";
import { restaurantRecipeCreateDataMock } from "../../__mocks__/recipeMocks";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

export const deleteRecipeBeforeEach = async () => {
  const { restaurant, token } = await simulateLogin();

  // Como a receita está vinculada a um restaurante, precisamos estar logados
  // Essa rota necessita autorização

  const recipeData = restaurantRecipeCreateDataMock(restaurant.id);

  // Criamos uma receita com o id do restaurant

  const recipe = await prisma.recipe.create({ data: recipeData });

  return { restaurant, token, recipe };

  // Aqui, criamos uma abstração pois essa parte do código se repete muitas vezes
};

describe("Integration test: Delete recipe", () => {
  test("Should be able to delete a recipe successfully", async () => {
    const { token, recipe } = await deleteRecipeBeforeEach();

    // Para deletarmos uma receita, ela precisa existir

    await request
      .delete(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });

  test("Should throw error when there is no token", async () => {
    const { recipe } = await deleteRecipeBeforeEach();

    // Mesmo testando a exceção, é necessário que a receita exista

    await request.delete(`/recipes/${recipe.id}`).expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const { recipe } = await deleteRecipeBeforeEach();

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .delete(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });

  test("Should throw error when recipe id is invalid", async () => {
    const { token } = await deleteRecipeBeforeEach();

    // Simulamos o login pois para atualizar uma recipe é necessário estar logado

    const data = await request
      .delete(`/recipes/727dd33c-12ff-494d-9ee6-5896e8a924b4`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("Recipe not found");
  });

  test("Should throw error when restaurant is not the recipe owner", async () => {
    const { recipe } = await deleteRecipeBeforeEach();

    const token = wrongUserToken();

    // Usamos uma token errada, que representaria outro usuário

    const data = await request
      .delete(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("Restaurant must be the owner of this recipe");
  });
});
