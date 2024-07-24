import { container } from "tsyringe";
import { CategoryServices } from "../../../services/category.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
    categoriesListMock
} from "../../__mocks__/categoryMocks";
import { restaurant } from "../../__mocks__/restaurantMocks";

describe("Unit test: Get Many Categories", () => {
  test("Get many categories should work correctly", async () => {
    const categoryService = container.resolve(CategoryServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.category.findMany.mockResolvedValue(categoriesListMock);

    const data = await categoryService.getMany(restaurant.id);

    // Precisamos de um id para puxar todas as categorias de um restaurante especifico

    expect(data).toHaveLength(categoriesListMock.length);
    expect(data[0]).toStrictEqual(categoriesListMock[0]);
    expect(data[1]).toStrictEqual(categoriesListMock[1]);
  });
});
