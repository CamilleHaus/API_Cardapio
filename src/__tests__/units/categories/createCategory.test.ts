import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
  categoryCreateBodyMock,
  categoryMock,
} from "../../__mocks__/categoryMocks";
import { restaurant } from "../../__mocks__/restaurantMocks";

describe("Unit test: Create Category", () => {
  test("Create category should work correctly", async () => {
    const categoryService = container.resolve(CategoryServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.category.create.mockResolvedValue(categoryMock);

    // Aqui, interceptamos o prisma, e mockamos o resultado que esperamos do banco

    const data = await categoryService.create(
      categoryCreateBodyMock,
      restaurant.id
    );

    // Pegamos o mesmo id que usamos no Mock

    expect(data).toStrictEqual(categoryMock);
  });
});
