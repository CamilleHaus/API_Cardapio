import { prisma } from "../../../database/prisma";
import {
  restaurantCreateBodyMock,
  wrongRestaurantCreateBodyMock,
} from "../../__mocks__/restaurantMocks";
import { request } from "../../utils/supertest";

describe("Integration test: Register Restaurant", () => {
  test("Should be able to register a restaurant successfully", async () => {
    const data = await request
      .post("/restaurants")
      .expect(201)
      .send(restaurantCreateBodyMock)
      .then((response) => response.body);

    // request vem do supertest
    // Aqui enviamos o mesmo mock de criação que usamos no Unit tests pois é o que o serviço pede
    // Simulamos a requisição da API

    expect(data.id).toBeDefined();
    expect(data.name).toBe(restaurantCreateBodyMock.name);
    expect(data.email).toBe(restaurantCreateBodyMock.email);
    expect(data.description).toBe(null);
    expect(data.password).toBeUndefined();

    // Teste para que a senha não venha
  });

  test("Should throw error when email is already registered", async () => {
    await prisma.restaurant.create({ data: restaurantCreateBodyMock });

    // Precisamos criar um restaurant no banco de dados para comparação

    await request
      .post("/restaurants")
      .expect(403)
      .send(restaurantCreateBodyMock);

    // Tentamos criar o restaurant de novo e esperamos que dessa vez venha o status de erro pois esse restaurant foi criado acima
  });

  test("Should throw error when missing body parameter", async () => {
    const data = await request
      .post("/restaurants")
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
    const data = await request
      .post("/restaurants")
      .expect(409)
      .send(wrongRestaurantCreateBodyMock)
      .then((response) => response.body);

    // Enviamos um objeto com as chaves certas porém os tipos de dados errados

    data.issues.forEach((issue: { message: string }) => {
      expect(issue.message).toBe("Expected string, received number");
    });
  });
});
