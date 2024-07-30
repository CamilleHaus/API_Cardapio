import { response } from "express";
import { restaurantUpdateBodyMock } from "../../__mocks__/restaurantMocks";
import { restaurantDefaultExpects } from "../../utils/restaurantDefaultExpects";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Update Restaurant", () => {
  test("Should be able to update a restaurant successfully", async () => {
    const { restaurant, token } = await simulateLogin();

    // Simulamos o login, pois para atualizar um restaurant, precisamos estar logados

    const data = await request
      .patch(`/restaurants`)
      .set("Authorization", `Bearer ${token}`)
      .send(restaurantUpdateBodyMock)
      .expect(200)
      .then((response) => response.body);

    const expectUpdatedRestaurant = {
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      description: restaurantUpdateBodyMock.description,
      password: restaurant.password,
    };

    // Criamos o objeto retornado do restaurant que será atualizado

    restaurantDefaultExpects(data, expectUpdatedRestaurant);
  });

  test("Should throw error when there is no token", async () => {
    await request
      .patch("/restaurants")
      .send(restaurantUpdateBodyMock)
      .expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .patch("/restaurants")
      .set("Authorization", `Bearer ${token}`)
      .send(restaurantUpdateBodyMock)
      .expect(401);
  });
});
