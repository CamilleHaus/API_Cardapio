import bcrypt from "bcrypt";

export const restaurant = {
  id: "9768e898-cd31-49f1-baf4-bc938cfd39ec",
  name: "Resurant",
  email: "restaurant@email.com",
  description: null,
  password: "1234",
};

// O id desse restaurante servirá de base para testes de recipe

export const restaurantListMock = [restaurant];

export const restaurantReturnListMock = [
  {
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
  },
];

export const restaurantMock = async () => {
  const hashedPassword = await bcrypt.hash(restaurant.password, 10);

  return {
    id: restaurant.id,
    name: restaurant.name,
    email: restaurant.email,
    description: restaurant.description,
    password: hashedPassword,
  };
};

export const restaurantCreateBodyMock = {
  name: restaurant.name,
  email: restaurant.email,
  password: restaurant.password,
};

// Desse jeito, caso alteremos algo no futuro, não precisaremos alterar em todos

export const restaurantReturnMock = {
  id: restaurant.id,
  name: restaurant.name,
  email: restaurant.email,
  description: restaurant.description,
};

export const restaurantLoginBodyMock = {
  email: restaurant.email,
  password: restaurant.password,
};

export const wrongPasswordLoginBodyMock = {
  email: restaurant.email,
  password: "4321",
};

export const restaurantUpdateBodyMock = {
  description: "Description Example",
};

export const restaurantUpdatedMock = async () => {
  const restaurant = await restaurantMock();

  return {
    ...restaurant,
    description: restaurantUpdateBodyMock.description,
  };
};

// Criamos um restaurant e trocamos o description pelo que vem no updateBodyMock

export const restaurantUpdateReturnMock = {
  id: restaurant.id,
  name: restaurant.name,
  email: restaurant.email,
  description: restaurantUpdateBodyMock.description,
};
