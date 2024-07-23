import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import {
  restaurantLoginBodyMock,
  restaurantMock,
  restaurantReturnMock,
  wrongPasswordLoginBodyMock,
} from "../../__mocks__/restaurantMocks";
import { prismaMock } from "../../__mocks__/prisma";

describe("Unit test: Login Restaurant", () => {
  test("Login restaurant should work correctly", async () => {
    const restaurantServices = container.resolve(RestaurantServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    const restaurantMockValue = await restaurantMock();

    // Como é uma chamada de função, precisamos guardar o retorno em uma constante

    prismaMock.restaurant.findFirst.mockResolvedValue(restaurantMockValue);

    // Passando esse retorno para o valor que será mockado no FindFirst

    const data = await restaurantServices.login(restaurantLoginBodyMock);

    expect(data.accessToken).toBeDefined();
    expect(data.restaurant).toStrictEqual(restaurantReturnMock);

    // Aqui, conferimos que o accessToken existirá no retorno
    // E que o retorno do restaurant não terá a senha no retorno
  });

  test("should throw an error when restaurant does not exists", async () => {
    const restaurantServices = container.resolve(RestaurantServices);

    const login = async () =>
      await restaurantServices.login(restaurantLoginBodyMock);

    expect(login()).rejects.toThrow("Restaurant not registered");

    // Aqui, basicamente tentamos fazer um login de um restaurant que não existe. Já que não mockamos nada, ele não existirá
  });

  test("should throw an error when credentials do not match", async () => {
    const restaurantServices = container.resolve(RestaurantServices);

    const restaurantMockValue = await restaurantMock();

    prismaMock.restaurant.findFirst.mockResolvedValue(restaurantMockValue);

    const login = async () =>
      await restaurantServices.login(wrongPasswordLoginBodyMock);

    // Enviamos o mock com uma senha errada

    expect(login()).rejects.toThrow("Email and password doesn't match");
  });
});
