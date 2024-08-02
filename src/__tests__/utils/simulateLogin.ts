import { prisma } from "../../database/prisma";
import { restaurantCreateDataMock } from "../__mocks__/restaurantMocks";
import jwt from "jsonwebtoken";

export const simulateLogin = async () => {
  const userData = await restaurantCreateDataMock();

  // Usamos a função que criamos que simula um usuário com a senha já hasheada

  const restaurant = await prisma.restaurant.create({ data: userData });

  // Para podermos simular um login, primeiro é necessário que o usuário esteja criado no banco

  const token = jwt.sign(
    { id: restaurant.id },
    process.env.JWT_SECRET as string
  );

  // Fazemos o mesmo passo do login de criação de token

  return { restaurant, token };
};

export const invalidToken = () => {
  const token = jwt.sign({}, "1234");

  // Retiramos e ID e passamos um segredo falso

  return token;
};

export const wrongUserToken = () => {
  const token = jwt.sign({ id: "12345678abc"}, process.env.JWT_SECRET as string);

  return token;
}

// Aqui estamos simulando um usuário, porém passando um ID que não existiria para nao corrermos riscos