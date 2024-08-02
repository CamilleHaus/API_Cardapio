import { prisma } from "../../../database/prisma";
import { recipeWrongCreateBodyMock } from "../../__mocks__/recipeMocks";
import { recipeCreateBodyMock } from "../../__mocks__/recipeMocks";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Create recipe", () => {
  test("Should be able to create a recipe successfully (WITHOUT category)", async () => {
    const { restaurant, token } = await simulateLogin();

    // Como essa rota nessecita de autorização, precisamos simular o login para termos o token

    const data = await request
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeCreateBodyMock)
      .expect(201)
      .then((response) => response.body);

    // Fazemos a requisição normal, passando o token do restaurante

    expect(data.id).toBeDefined();
    expect(data.name).toBe(recipeCreateBodyMock.name);
    expect(data.price).toBe(recipeCreateBodyMock.price);
    expect(data.description).toBe(recipeCreateBodyMock.description);
    expect(data.restaurantId).toBe(restaurant.id); // toda receita tem um restaurantId, que é o mesmo id do restaurant logado
    expect(data.categoryId).toBe(null);
  });

  test("Should be able to create a recipe successfully (WITH category)", async () => {
    const { restaurant, token } = await simulateLogin();

    // Como essa rota nessecita de autorização, precisamos simular o login para termos o token

    const categoryData = {
      name: "Exemplo",
      restaurantId: restaurant.id,
    };

    const category = await prisma.category.create({ data: categoryData });

    // Estamos criando uma categoria no banco

    const createRecipeData = {
      ...recipeCreateBodyMock,
      categoryId: category.id,
    };

    // Adicionamos uma categoria ao mock e usamos o Id da categoria que criamos

    const data = await request
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(createRecipeData)
      .expect(201)
      .then((response) => response.body);

    // Fazemos a requisição normal, passando o token do restaurante

    expect(data.id).toBeDefined();
    expect(data.name).toBe(recipeCreateBodyMock.name);
    expect(data.price).toBe(recipeCreateBodyMock.price);
    expect(data.description).toBe(recipeCreateBodyMock.description);
    expect(data.restaurantId).toBe(restaurant.id); // toda receita tem um restaurantId, que é o mesmo id do restaurant logado
    expect(data.categoryId).toBe(category.id);
  });

  test("Should throw error when there is no token", async () => {
    await request.post("/recipes").send(recipeCreateBodyMock).expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send(recipeCreateBodyMock)
      .expect(401);
  });

  test("Should throw error when missing body parameter", async () => {
    const data = await request
      .post("/recipes")
      .expect(409)
      .then((response) => response.body);

    // Aqui, tentamos fazer a requisição porém não enviamos o corpo esperado

    expect(data.issues).toHaveLength(3);

    // Length de 3 pois isso pode variar do numero de erros que está vindo da nossa requisição com o ZOD

    data.issues.forEach((issue: { message: string }) => {
      expect(issue.message).toBe("Required");
    });

    // Percorremos o array do ZOD para ver se todos as chaves que forem "messages" estão trazendo a string "Required"
  });

  test("Should throw error when invalid data type in body parameter", async () => {
    const { token } = await simulateLogin();

    // Login simulado apenas para aumentar a precisão dos testes, mas funcionaria sem

    const data = await request
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .expect(409)
      .send(recipeWrongCreateBodyMock)
      .then((response) => response.body);

    // Enviamos um objeto com as chaves certas porém os tipos de dados errados

    expect(data.issues).toHaveLength(4);
    expect(data.issues[0].message).toBe("Expected string, received number");
    expect(data.issues[1].message).toBe("Expected string, received number");
    expect(data.issues[2].message).toBe("Expected number, received string");
    expect(data.issues[3].message).toBe("Expected string, received number");

    // Aqui, como a mensagem não é a mesma, nao fazemos um forEach
  });
});
