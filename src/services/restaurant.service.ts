import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import {
  TPublicRestaurant,
  TRestaurantLogin,
  TRestaurantLoginReturn,
  TRestaurantRegisterBody,
  TRestaurantReturn,
  TRestaurantUpdateBody,
  publicRestaurantReturn,
  restaurantReturnSchema,
} from "../schemas/restaurant.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@injectable()
export class RestaurantServices {
  async register(body: TRestaurantRegisterBody): Promise<TRestaurantReturn> {
    const existingRestaurant = await prisma.restaurant.findFirst({
      where: { email: body.email },
    });

    if (existingRestaurant) {
      throw new AppError("This email is already registered", 403);
    }

    // Primeira verificação tem que ser essa pois se o email já existe no banco de dados, ele não pode ser cadastrado novamente

    const hashPassword = await bcrypt.hash(body.password, 10);

    const newRestaurantData = { ...body, password: hashPassword };

    // Aqui, não podemos guardar no banco uma senha não-criptografada, por isso, criptografamos ela
    // Então, criamos um novo objeto que "espalha" o que vem do body e substitui a senha pela sua versao codificada

    const restaurant = await prisma.restaurant.create({
      data: newRestaurantData,
    });

    return restaurantReturnSchema.parse(restaurant);

    // Retiramos a senha do retorno com o método parse
  }

  async login(body: TRestaurantLogin): Promise<TRestaurantLoginReturn> {
    const restaurant = await prisma.restaurant.findFirst({
      where: { email: body.email },
    });

    if (!restaurant) {
      throw new AppError("Restaurant not registered", 404);
    }

    // Primeiro, procuramos se o restaurante existe no banco de dados. Se não exister, soltamos o erro

    const comparePassword = await bcrypt.compare(
      body.password,
      restaurant.password
    );

    if (!comparePassword) {
      throw new AppError("Email and password doesn't match", 401);
    }

    // Aqui, caso achemos o email no DB, precisamos validar se as senhas batem. Então usamos o bcrypt para comparar
    // pois a senha no DB está hasheada

    const secret = process.env.JWT_SECRET as string;

    const token = jwt.sign({ id: restaurant.id }, secret);

    return {
      accessToken: token,
      restaurant: restaurantReturnSchema.parse(restaurant),
    };

    // Aqui, usando o jwt e o método sign, criamos um token baseado no ID do usuário.
    // Retornados então um objeto com o token e o restaurant (sem a senha)
  }

  async update(
    body: TRestaurantUpdateBody,
    restaurantId: string
  ): Promise<TRestaurantReturn> {
    const restaurant = await prisma.restaurant.update({
      where: {
        id: restaurantId,
      },
      data: body,
    });

    return restaurantReturnSchema.parse(restaurant);

    // Aqui, colocamos a clausula do WHERE para garantir que apenas o restaurante corresponde ao restaurantId passado
    // possa ser atualizado
  }

  async getRestaurant(restaurantId: string): Promise<TRestaurantReturn> {
    const restaurant = await prisma.restaurant.findFirst({
      where: {
        id: restaurantId,
      },
    });

    return restaurantReturnSchema.parse(restaurant);
  }

  async getManyRestaurants(): Promise<TPublicRestaurant[]> {
    const restaurant = await prisma.restaurant.findMany();

    const publicRestaurant = restaurant.map((restaurant) =>
      publicRestaurantReturn.parse(restaurant)
    );

    return publicRestaurant;

    // Aqui, buscamos todos os restaurantes e para retorna-los apenas com os dados necessários, fazemos um map
    // sobre a lista de restaurantes onde todo restaurante retornado passará pelo PARSE antes
  }
}
