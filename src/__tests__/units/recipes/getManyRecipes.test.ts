import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import { prismaMock } from "../../__mocks__/prisma";
import { recipeListMock, secondRecipeMock } from "../../__mocks__/recipeMocks";

describe("Unit test: Get Many Recipes", () => {
  test("Get many recipes should work correctly", async () => {
    const recipeService = container.resolve(RecipeServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.recipe.findMany.mockResolvedValue(recipeListMock);

    const data = await recipeService.getMany(recipeListMock[0].restaurantId);

    // Trazemos o restaurante pelo id. Na lista mockada, os resurantes tem o mesmo ID

    expect(data).toHaveLength(2);
    expect(data[0]).toStrictEqual(recipeListMock[0]);
    expect(data[1]).toStrictEqual(recipeListMock[1]);

    // Aqui estamos comparando cada item que puxamos do da lista
  });

  test("Get many recipes should filter by categoryId correctly", async () => {

    const recipeService = container.resolve(RecipeServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.recipe.findMany.mockResolvedValue([secondRecipeMock]);

    // Aqui passamos a receita que tem o categoryId definido

    const data = await recipeService.getMany(secondRecipeMock.restaurantId, secondRecipeMock.categoryId);

    // No serviço, nosso parametro categoryId é opicional

    expect(data).toHaveLength(1);
    expect(data[0]).toStrictEqual(secondRecipeMock);
  })
});
