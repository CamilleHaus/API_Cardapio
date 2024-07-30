import { prisma } from "../../../database/prisma";
import { restaurantListMock } from "../../__mocks__/restaurantMocks";
import { request } from "../../utils/supertest";

describe("Integration test: Get Many Restaurants", () => {
  test("Should be able to get many restaurants successfully", async () => {
    await prisma.restaurant.createMany({ data: restaurantListMock });

    // O prisma aceita um objeto que já tem o ID, se ele atender as mesmas caracteristicas
    // do qual é gerado pelo Prisma

    const data = await request
      .get("/restaurants")
      .expect(200)
      .then((response) => response.body);

    expect(data).toHaveLength(restaurantListMock.length);
    expect(data[0].id).toBe(restaurantListMock[0].id);
    expect(data[0].name).toBe(restaurantListMock[0].name);
    expect(data[0].description).toBe(restaurantListMock[0].description);
    expect(data[0].email).toBeUndefined();
    expect(data[0].password).toBeUndefined();
  });
});
