import { container } from "tsyringe";
import { RestaurantServices } from "../../../services/restaurant.service";
import { prismaMock } from "../../__mocks__/prisma";
import {
  restaurantCreateBodyMock,
  restaurantMock,
  restaurantReturnMock,
} from "../../__mocks__/restaurantMocks";

describe("Unit test: Register Restaurant", () => {
  test("Register restaurant should work correctly", async () => {
    // Mesmo mockando o banco, ainda é um processo assíncrono

    const restaurantServices = container.resolve(RestaurantServices);

    // Instanciamos o serviço de resurante pelo Tsyringe para podermos usá-lo

    prismaMock.restaurant.create.mockResolvedValue(await restaurantMock());

    // Aqui, interceptamos o prisma, e mockamos o resultado que esperamos do banco

    const data = await restaurantServices.register(restaurantCreateBodyMock);

    // Precisamos passar um parâmetro de registro, igual recebido no nosso Service

    expect(data).toStrictEqual(restaurantReturnMock);
  });

  test("Should throw an error when email is already registered", async () => {

    const restaurantServices = container.resolve(RestaurantServices);

    prismaMock.restaurant.findFirst.mockResolvedValue(await restaurantMock())

    // Mockamos o findFirst pois é o metodo que usamos no serviço para achar o email do usuário no banco

    const register = async  () => restaurantServices.register(restaurantCreateBodyMock);

    // Em testes de erro, é necessário chamarmos como função para ser executado

    expect(register()).rejects.toThrow("This email is already registered")
  })
});
