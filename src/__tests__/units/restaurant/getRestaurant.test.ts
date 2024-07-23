import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { prismaMock } from "../../__mocks__/prisma";
import { restaurantMock, restaurantReturnMock } from "../../__mocks__/restaurantMocks";

describe("Unit test: Get Restaurant", () => {
  test("Get restaurant should work correctly", async () => {
    const restaurantServices = container.resolve(RestaurantServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    const restaurant = await restaurantMock();

    // Criamos um restaurant para mockarmos abaixo

    prismaMock.restaurant.findFirst.mockResolvedValue(restaurant);

    // Mockamos o findFirst pois é o método usado no serviço

    const data = await restaurantServices.getRestaurant(restaurant.id);

    // Passamos o próprio ID do restaurante criado pois é ele que queremos achar

    expect(data).toStrictEqual(restaurantReturnMock);
  });
});
