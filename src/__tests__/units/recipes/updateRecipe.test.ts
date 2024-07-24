import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
    updateRecipeBodyMock,
    updatedRecipeMock
} from "../../__mocks__/recipeMocks";

describe("Unit test: Update Recipe", () => {
  test("Update recipe should work correctly", async () => {
    const recipeService = container.resolve(RecipeServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.recipe.update.mockResolvedValue(updatedRecipeMock);

    const data = await recipeService.update(
      updateRecipeBodyMock,
      updatedRecipeMock.id
    );

    // Passando o corpo que será atualizado e o ID da receita que mockamos, pois ela é o retorno esperado

    expect(data).toStrictEqual(updatedRecipeMock);
  });
});
