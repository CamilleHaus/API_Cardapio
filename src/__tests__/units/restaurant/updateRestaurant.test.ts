import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
  restaurantMock,
  restaurantUpdateBodyMock,
  restaurantUpdateReturnMock,
  restaurantUpdatedMock,
} from "../../__mocks__/restaurantMocks";

describe("Unit test: Update Restaurant", () => {
  test("Update restaurant should work correctly", async () => {
    const restaurantServices = container.resolve(RestaurantServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    const restaurant = await restaurantMock();

    // Criamos um restaurante e armazenamos numa função, pois essa rota precisa de um ID de restaurante para
    // saber qual restaurant será atualizado

    prismaMock.restaurant.update.mockResolvedValue(
      await restaurantUpdatedMock()
    );

    // Mockamos o resultado do update. Usamos o await pois é uma função assíncrona

    const data = await restaurantServices.update(
      restaurantUpdateBodyMock,
      restaurant.id
    );

    expect(data).toStrictEqual(restaurantUpdateReturnMock);
  });
});
