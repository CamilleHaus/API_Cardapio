import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
    updateCategoryBodyMock,
    updatedCategoryMock
} from "../../__mocks__/categoryMocks";

describe("Unit test: Update Category", () => {
  test("Update category should work correctly", async () => {
    const categoryService = container.resolve(CategoryServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.category.update.mockResolvedValue(updatedCategoryMock);

    const data = await categoryService.update(
      updateCategoryBodyMock,
      updatedCategoryMock.id
    );

    expect(data).toStrictEqual(updatedCategoryMock);
  });
});
