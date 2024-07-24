import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import {
    categoryMock
} from "../../__mocks__/categoryMocks";

describe("Unit test: Delete Category", () => {
  test("Delete category should work correctly", async () => {
    const categoryService = container.resolve(CategoryServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    // Não mockamos nada pois não há retorno no delete
    
    await categoryService.delete(categoryMock.id);
  });
});
