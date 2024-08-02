import { prisma } from "../../../database/prisma";
import { TCategory } from "../../../schemas/category.schema";
import { restaurantCategoryCreateDataMock } from "../../__mocks__/categoryMocks";
import { simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Get Restaurant Categories", () => {
  test("Should be able to get restaurant categories category successfully", async () => {
    const { restaurant } = await simulateLogin();

    // Para criarmos uma categoria, é necessário estarmos logamos

    const categoryData = restaurantCategoryCreateDataMock(restaurant.id);

    const categoryListData = [categoryData, categoryData];

    await prisma.category.createMany({ data: categoryListData });

    // Criamos uma lista de categorias e criamos no banco

    const data = await request
      .get(`/categories/${restaurant.id}`)
      .expect(200)
      .then((response) => response.body);

    expect(data).toHaveLength(categoryListData.length);
    data.forEach((category: TCategory) => {
      expect(category.id).toBeDefined();
      expect(category.name).toBe(categoryData.name);
      expect(category.restaurantId).toBe(restaurant.id);
    });
  });

  test("Should throw an error when category ID is not valid", async () => {
    const data = await request
      .get("/categories/727dd33c-12ff-494d-9ee6-5896e8a924b4")
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("Category not found");

    // Estamos testando a mensagem de retorno do Middleware
  });
});
