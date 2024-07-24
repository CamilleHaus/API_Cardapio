import { restaurant } from "./restaurantMocks";

export const categoryMock = {
  id: "21ea20d4-67b2-4ea6-9478-6c7c2664d7bc",
  name: "Category Name",
  restaurantId: restaurant.id,
};

// Importamos o id do restaurantMock

export const categoryCreateBodyMock = {
  name: categoryMock.name,
};

export const secondCategoryMock = {
  id: "21ea20d4-67b2-4ea6-9478-6c7c2664d7bc",
  name: "Category 2",
  restaurantId: restaurant.id,
};

export const categoriesListMock = [categoryMock, secondCategoryMock];

export const updatedCategoryMock = {
  id: categoryMock.id,
  name: "Category Updated",
  restaurantId: categoryMock.restaurantId,
};

export const updateCategoryBodyMock = {
  name: updatedCategoryMock.name,
};
