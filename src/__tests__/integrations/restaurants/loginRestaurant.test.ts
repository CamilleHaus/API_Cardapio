import { prisma } from "../../../database/prisma";
import {
  restaurantCreateDataMock,
  restaurantLoginBodyMock,
  wrongPasswordLoginBodyMock,
  wrongRestaurantLoginBodyMock,
} from "../../__mocks__/restaurantMocks";
import { restaurantDefaultExpects } from "../../utils/restaurantDefaultExpects";
import { request } from "../../utils/supertest";

describe("Integration test: Login Restaurant", () => {
  test("Should be able to login a restaurant successfully", async () => {
    const restaurantData = await restaurantCreateDataMock();

    //Usamos esse mock para criar um restaurante

    const user = await prisma.restaurant.create({ data: restaurantData });

    // Inserimos um novo restaurante no banco

    const data = await request
      .post("/restaurants/login")
      .send(restaurantLoginBodyMock)
      .expect(200)
      .then((response) => response.body);

    // Fazemos o login igual fazemos com o serviço

    expect(data.accessToken).toBeDefined();
    restaurantDefaultExpects(data.restaurant, user);
    expect(data.restaurant.password).toBeUndefined();
  });

  test("Should throw an error when restaurant is not registered", async () => {
    await request
      .post("/restaurants/login")
      .send(restaurantLoginBodyMock)
      .expect(404);
  });

  test("Should throw an error when email/password doesn't match", async () => {
    const restaurantData = await restaurantCreateDataMock();

    //Usamos esse mock para criar um restaurante

    const user = await prisma.restaurant.create({ data: restaurantData });

    // Inserimos um novo restaurante no banco

    await request
      .post("/restaurants/login")
      .send(wrongPasswordLoginBodyMock)
      .expect(401);

    // Fazemos a requisição enviando informações de login erradas
  });

  test("Should throw error when missing body parameter", async () => {
    const data = await request
      .post("/restaurants/login")
      .expect(409)
      .then((response) => response.body);

    // Aqui, tentamos fazer a requisição porém não enviamos o corpo esperado

    expect(data.issues).toHaveLength(2);

    // Length de 2 pois isso pode variar do numero de erros que está vindo da nossa requisição com o ZOD

    data.issues.forEach((issue: { message: string }) => {
      expect(issue.message).toBe("Required");
    });

    // Percorremos o array do ZOD para ver se todos as chaves que forem "messages" estão trazendo a string "Required"
  });

  test("Should throw error when invalid data type in body parameter", async () => {
    const data = await request
      .post("/restaurants/login")
      .expect(409)
      .send(wrongRestaurantLoginBodyMock)
      .then((response) => response.body);

    // Enviamos um objeto com as chaves certas porém os tipos de dados errados

    expect(data.issues).toHaveLength(2);

    data.issues.forEach((issue: { message: string }) => {
      expect(issue.message).toBe("Expected string, received number");
    });
  });
});
