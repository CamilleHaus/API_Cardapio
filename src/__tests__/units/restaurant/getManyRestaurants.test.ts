import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
  restaurantListMock,
  restaurantReturnListMock,
} from "../../__mocks__/restaurantMocks";

describe("Unit test: Get Many Restaurants", () => {
  test("Get many restaurants should work correctly", async () => {
    const restaurantServices = container.resolve(RestaurantServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.restaurant.findMany.mockResolvedValue(restaurantListMock);

    // Mockamos no prisma a lista de restaurantes

    const data = await restaurantServices.getManyRestaurants();

    expect(data).toHaveLength(restaurantReturnListMock.length);
    expect(data[0]).toStrictEqual(restaurantReturnListMock[0]);
  });
});
