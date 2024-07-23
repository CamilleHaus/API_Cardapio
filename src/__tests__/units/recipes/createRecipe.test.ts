import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import { prismaMock } from "../../__mocks__/prisma";
import { recipeCreateBodyMock, recipeMock } from "../../__mocks__/recipeMocks";
import { restaurant } from "../../__mocks__/restaurantMocks";

describe("Unit test: Create Recipe", () => {
  test("Create recipe should work correctly", async () => {
    const recipeService = container.resolve(RecipeServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.recipe.create.mockResolvedValue(recipeMock);

    // Aqui, interceptamos o prisma, e mockamos o resultado que esperamos do banco

    const data = await recipeService.create(
      recipeCreateBodyMock,
      restaurant.id
    );

    // Puxamos o ID do mock the restaurants, já que usamos o mesmo id para o recipe

    expect(data).toStrictEqual(recipeMock);
  });
});
