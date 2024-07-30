import { restaurantDefaultExpects } from "../../utils/restaurantDefaultExpects";
import { invalidToken, simulateLogin } from "../../utils/simulateLogin";
import { request } from "../../utils/supertest";

describe("Integration test: Get Restaurant Profile", () => {
  test("Should be able to get restaurant profile successfully", async () => {
    const { restaurant, token } = await simulateLogin();

    // Chamamos o util que simula o login

    const data = await request
      .get("/restaurants/profile")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => response.body);

    // Fazemos a requisição de forma normal e usamos o SET para enviar o token do restaurante,
    // pois essa rota necessita de autorização

    restaurantDefaultExpects(data, restaurant);
    expect(data.password).toBeUndefined();
  });

  test("Should throw error when there is no token", async () => {
    await request.get("/restaurants/profile").expect(401);
  });

  test("Should throw error when token is not valid", async () => {
    // Token expirada ou criada com segredo diferente

    const token = invalidToken();

    // Chamamos a função que cria um token falso

    await request
      .get("/restaurants/profile")
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
  });
});
