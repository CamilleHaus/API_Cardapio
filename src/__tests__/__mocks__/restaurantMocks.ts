export const restaurantMock = {
  id: "9768e898-cd31-49f1-baf4-bc938cfd39ec",
  name: "Resurant",
  email: "restaurant@email.com",
  description: null,
  password: "1234",
};

export const restaurantCreateBodyMock = {
  name: restaurantMock.name,
  email: restaurantMock.email,
  password: restaurantMock.password,
};

// Desse jeito, caso alteremos algo no futuro, não precisaremos alterar em todos

export const restaurantReturnMock = {
  id: restaurantMock.id,
  name: restaurantMock.name,
  email: restaurantMock.email,
  description: restaurantMock.description,
};
