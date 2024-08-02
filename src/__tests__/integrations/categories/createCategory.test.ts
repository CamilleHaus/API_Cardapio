import {
  categoryCreateBodyMock,
  categoryWrongCreareBodyMock,
} from "../../__mocks__/categoryMocks";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Create Category", () => {
  test("Should be able to create a category successfully", async () => {
    const { restaurant, token } = await simulateLogin();

    // Para criarmos uma categoria, é necessário estarmos logamos
    // Rota precisa de autorização

    const data = await request
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryCreateBodyMock)
      .expect(201)
      .then((response) => response.body);

    expect(data).toBeDefined();
    expect(data.name).toBe(categoryCreateBodyMock.name);
    expect(data.restaurantId).toBe(restaurant.id);
  });

  test("Should throw error when there is no token", async () => {
    await request.post("/categories").send(categoryCreateBodyMock).expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryCreateBodyMock)
      .expect(401);
  });

  test("Should throw error when missing body parameter", async () => {
    const { token } = await simulateLogin();

    const data = await request
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .expect(409)
      .then((response) => response.body);

    // Aqui, tentamos fazer a requisição porém não enviamos o corpo esperado

    expect(data.issues).toHaveLength(1);

    // Length de 3 pois isso pode variar do numero de erros que está vindo da nossa requisição com o ZOD

    expect(data.issues[0].message).toBe("Required");
  });

  // Percorremos o array do ZOD para ver se todos as chaves que forem "messages" estão trazendo a string "Required"

  test("Should throw error when invalid data type in body parameter", async () => {
    const { token } = await simulateLogin();

    // Login simulado apenas para aumentar a precisão dos testes, mas funcionaria sem

    const data = await request
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .expect(409)
      .send(categoryWrongCreareBodyMock)
      .then((response) => response.body);

    // Enviamos um objeto com as chaves certas porém os tipos de dados errados

    expect(data.issues).toHaveLength(1);
    expect(data.issues[0].message).toBe("Expected string, received number");

    // Aqui, como a mensagem não é a mesma, nao fazemos um forEach
  });
});
