import { prisma } from "../../../database/prisma";
import {
    categoryWrongUpdateBodyMock,
    restaurantCategoryCreateDataMock,
    updateCategoryBodyMock,
} from "../../__mocks__/categoryMocks";
import { invalidToken, simulateLogin, wrongUserToken } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

export const updateCategoryBeforeEach = async () => {
  const { restaurant, token } = await simulateLogin();

  // Como a receita está vinculada a um restaurante, precisamos estar logados
  // Essa rota necessita autorização

  const categoryData = restaurantCategoryCreateDataMock(restaurant.id);

  // Criamos uma categoria com o id do restaurant

  const category = await prisma.category.create({ data: categoryData });

  return { restaurant, token, category };

  // Aqui, criamos uma abstração pois essa parte do código se repete muitas vezes
};

describe("Integration test: Update Category", () => {
  test("Should be able to update a category successfully", async () => {
    const { restaurant, token, category } = await updateCategoryBeforeEach();

    const data = await request
      .patch(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateCategoryBodyMock)
      .expect(201)
      .then((response) => response.body);

    expect(data.id).toBe(category.id);
    expect(data.name).toBe(updateCategoryBodyMock.name);
    expect(data.restaurantId).toBe(restaurant.id);
  });

  test("Should throw error when there is no token", async () => {
    const { category } = await updateCategoryBeforeEach();

    // Como a categoria está vinculada a um restaurante, precisamos estar logados
    // Essa rota necessita autorização

    // Criamos uma categoria com o id do restaurant

    // Mesmo testando a exceção, é necessário que a receita exista

    await request
      .patch(`/categories/${category.id}`)
      .send(updateCategoryBodyMock)
      .expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const { category } = await updateCategoryBeforeEach();

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .patch(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateCategoryBodyMock)
      .expect(401);
  });

  test("Should throw error when invalid data type in body parameter", async () => {
    const { token, category } = await updateCategoryBeforeEach();

    const data = await request
      .patch(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(categoryWrongUpdateBodyMock)
      .expect(409)
      .then((response) => response.body);

    // Enviamos um objeto com as chaves certas porém os tipos de dados errados

    expect(data.issues).toHaveLength(1);
    expect(data.issues[0].message).toBe("Expected string, received number");

    // Aqui, como a mensagem não é a mesma, nao fazemos um forEach
  });

  test("Should throw error when category id is invalid", async () => {
    const { token } = await updateCategoryBeforeEach();

    // Simulamos o login pois para atualizar uma recipe é necessário estar logado

    const data = await request
      .patch(`/categories/727dd33c-12ff-494d-9ee6-5896e8a924b4`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateCategoryBodyMock)
      .expect(404)
      .then((response) => response.body);

    expect(data.message).toBe("Category not found");
  });

  test("Should throw error when restaurant is not the category owner", async () => {
    const { category } = await updateCategoryBeforeEach();

    const token = wrongUserToken();

    // Usamos uma token errada, que representaria outro usuário

    const data = await request
      .patch(`/categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updateCategoryBodyMock)
      .expect(401)
      .then((response) => response.body);

    expect(data.message).toBe("Restaurant must be the owner of this category");
  });
});
