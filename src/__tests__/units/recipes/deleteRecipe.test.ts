import { container } from "tsyringe";
import { RecipeServices } from "../../../services/recipe.service";
import {
    recipeMock
} from "../../__mocks__/recipeMocks";

describe("Unit test: Delete Recipe", () => {
  test("Delete recipe should work correctly", async () => {
    const recipeService = container.resolve(RecipeServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    // Não mockamos nada pois não há retorno no delete

    await recipeService.delete(recipeMock.id);
  });
});
