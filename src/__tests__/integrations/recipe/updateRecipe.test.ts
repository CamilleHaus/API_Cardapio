import { prisma } from "../../../database/prisma";
import {
  recipeWrongUpdateBodyMock,
  restaurantRecipeCreateDataMock,
  updateRecipeDataMock,
} from "../../__mocks__/recipeMocks";
import {
  invalidToken,
  simulateLogin,
  wrongUserToken,
} from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

export const updateRecipeBeforeEach = async () => {
  const { restaurant, token } = await simulateLogin();

  // Como a receita está vinculada a um restaurante, precisamos estar logados
  // Essa rota necessita autorização

  const recipeData = restaurantRecipeCreateDataMock(restaurant.id);

  // Criamos uma receita com o id do restaurant

  const recipe = await prisma.recipe.create({ data: recipeData });

  const updateRecipeData = updateRecipeDataMock(null);

  return { restaurant, token, recipe, updateRecipeData };

  // Aqui, criamos uma abstração pois essa parte do código se repete muitas vezes
};



// ______________________ TESTS ________________________

describe("Integration test: Update recipe", () => {
  test("Should be able to update a recipe successfully", async () => {
    const { restaurant, token, recipe, updateRecipeData } =
      await updateRecipeBeforeEach();

    // Como a receita está vinculada a um restaurante, precisamos estar logados
    // Essa rota necessita autorização

    // Criamos uma receita com o id do restaurant

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

  test("Should throw error when there is no token", async () => {
    const { recipe, updateRecipeData } = await updateRecipeBeforeEach();

    // Como a receita está vinculada a um restaurante, precisamos estar logados
    // Essa rota necessita autorização

    // Criamos uma receita com o id do restaurant

    // Mesmo testando a exceção, é necessário que a receita exista

    await request
      .patch(`/recipes/${recipe.id}`)
      .send(updateRecipeData)
      .expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const { recipe, updateRecipeData } = await updateRecipeBeforeEach();

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .patch(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateRecipeData)
      .expect(401);
  });

  test("Should throw error when invalid data type in body parameter", async () => {
    const { token, recipe } = await updateRecipeBeforeEach();

    const data = await request
      .patch(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(recipeWrongUpdateBodyMock)
      .expect(409)
      .then((response) => response.body);

    // Enviamos um objeto com as chaves certas porém os tipos de dados errados

    expect(data.issues).toHaveLength(4);
    expect(data.issues[0].message).toBe("Expected string, received number");
    expect(data.issues[1].message).toBe("Expected string, received number");
    expect(data.issues[2].message).toBe("Expected number, received string");
    expect(data.issues[3].message).toBe("Expected string, received number");

    // Aqui, como a mensagem não é a mesma, nao fazemos um forEach
  });

  test("Should throw error when recipe id is invalid", async () => {
    const { token, updateRecipeData } = await updateRecipeBeforeEach();

    // Simulamos o login pois para atualizar uma recipe é necessário estar logado

    const data = await request
      .patch(`/recipes/727dd33c-12ff-494d-9ee6-5896e8a924b4`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateRecipeData)
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("Recipe not found");
  });

  test("Should throw error when restaurant is not the recipe owner", async () => {
    const { recipe, updateRecipeData } = await updateRecipeBeforeEach();

    const token = wrongUserToken();

    // Usamos uma token errada, que representaria outro usuário

    const data = await request
      .patch(`/recipes/${recipe.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateRecipeData)
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("Restaurant must be the owner of this recipe");
  });
});
