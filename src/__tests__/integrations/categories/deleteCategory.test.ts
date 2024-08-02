import { prisma } from "../../../database/prisma";
import { restaurantCategoryCreateDataMock } from "../../__mocks__/categoryMocks";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

export const deleteCategoryBeforeEach = async () => {
  const { restaurant, token } = await simulateLogin();

  // Como a receita está vinculada a um restaurante, precisamos estar logados
  // Essa rota necessita autorização

  const categoryData = restaurantCategoryCreateDataMock(restaurant.id);

  // Criamos uma categoria com o id do restaurant

  const category = await prisma.category.create({ data: categoryData });

  return { restaurant, token, category };

  // Aqui, criamos uma abstração pois essa parte do código se repete muitas vezes
};

describe("Integration test: Delete Category", () => {
  test("Should be able to delete a category successfully", async () => {
    const { token, category } = await deleteCategoryBeforeEach();

    await request
      .delete(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });

  test("Should throw error when there is no token", async () => {
    const { category } = await deleteCategoryBeforeEach();

    // Como a categoria está vinculada a um restaurante, precisamos estar logados
    // Essa rota necessita autorização

    // Criamos uma categoria com o id do restaurant

    // Mesmo testando a exceção, é necessário que a receita exista

    await request
      .delete(`/categories/${category.id}`)
      .expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const { category } = await deleteCategoryBeforeEach();

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .delete(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });

  test("Should throw error when category id is invalid", async () => {
    const { token } = await deleteCategoryBeforeEach();

    // Simulamos o login pois para atualizar uma recipe é necessário estar logado

    const data = await request
      .patch(`/categories/727dd33c-12ff-494d-9ee6-5896e8a924b4`)
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("Category not found");
  });

  test("Should throw error when restaurant is not the category owner", async () => {
    const { category } = await deleteCategoryBeforeEach();

    const token = wrongUserToken();

    // Usamos uma token errada, que representaria outro usuário

    const data = await request
      .patch(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("Restaurant must be the owner of this category");
  });
});
