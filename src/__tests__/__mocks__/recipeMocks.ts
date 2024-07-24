export const recipeMock = {
  id: "bf35ce81-3f91-4a67-8e12-acf51a264270",
  name: "Recipe",
  description: "Recipe Example",
  price: 1234,
  restaurantId: "9768e898-cd31-49f1-baf4-bc938cfd39ec",
  categoryId: null,
};

// restaurantId do mock de restaurant

export const recipeCreateBodyMock = {
  name: recipeMock.name,
  description: recipeMock.description,
  price: recipeMock.price,
};

export const secondRecipeMock = {
  id: "bf35ce81-3f91-4a67-8e12-acf51a264270",
  name: "Recipe 2",
  description: "Recipe Example 2",
  price: 1234,
  restaurantId: "9768e898-cd31-49f1-baf4-bc938cfd39ec",
  categoryId: "2e89732b-fdf3-4693-81b5-33d710dad106",
};

export const recipeListMock = [recipeMock, secondRecipeMock];


export const updatedRecipeMock = {
  id: recipeMock.id,
  name: "Recipe 3",
  description: "Recipe Example 3",
  price: 4546,
  restaurantId: recipeMock.restaurantId,
  categoryId: "3c621916-04a9-4b70-a0d0-61ea0bf57796",
}

export const updateRecipeBodyMock = {
  name: updatedRecipeMock.name,
  description: updatedRecipeMock.description,
  price: updatedRecipeMock.price,
  categoryId: updatedRecipeMock.categoryId,
}