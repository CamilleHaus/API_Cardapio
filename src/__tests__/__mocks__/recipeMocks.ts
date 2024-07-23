export const recipeMock = {
  id: "bf35ce81-3f91-4a67-8e12-acf51a264270",
  name: "Recipe",
  description: "Recipe Example",
  price: 1234,
  restaurantId: "9768e898-cd31-49f1-baf4-bc938cfd39ec",
  categoryId: null
};

// restaurantId do mock de restaurant

export const recipeCreateBodyMock = {
  name: recipeMock.name,
  description: recipeMock.description,
  price: recipeMock.price,
};
