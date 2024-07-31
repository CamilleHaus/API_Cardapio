import { prisma } from "../../../database/prisma";
import { recipeCreateBodyMock } from "../../__mocks__/recipeMocks";
import { simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Get one recipe", () => {
  test("Should be able to get one recipe by ID successfully", async () => {
    const { restaurant } = await simulateLogin();

    // Como puxaremos a receita de um restaurante, precisamos estar logados

    const recipeData = { ...recipeCreateBodyMock, restaurantId: restaurant.id };

    // Substituimos o ID do mock pelo ID do restaurante

    const recipe = await prisma.recipe.create({ data: recipeData });

    // Criamos a receita no banco

    const data = await request
    .get(`/recipes/${recipe.id}`)
    .expect(200)
    .then((response) => response.body);

    expect(data).toStrictEqual(recipe);
  });

  test("Should throw an error when ID is not valid", async () => {

    await request
    .get(`/recipes/727dd33c-12ff-494d-9ee6-5896e8a924b4`)
    .expect(404)

    // O teste unitário já testa a mensagem, por isso não testamos aqui
  });


});
