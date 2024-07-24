import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import { prismaMock } from "../../__mocks__/prisma";
import { recipeMock } from "../../__mocks__/recipeMocks";

describe("Unit test: Get One Recipe", () => {
  test("Get one recipe should work correctly", async () => {
    const recipeService = container.resolve(RecipeServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.recipe.findFirst.mockResolvedValue(recipeMock);

    // Aqui, interceptamos o prisma, e mockamos o resultado que esperamos do banco. FindFirst pois é o método utilizado no serviço

    const data = await recipeService.getOne(recipeMock.id);

    // Pegamos o proprio id do mock pois é essa recipe que esperamos retornar

    expect(data).toStrictEqual(recipeMock);
  });
});
