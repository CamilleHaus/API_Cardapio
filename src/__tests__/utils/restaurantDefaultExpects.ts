import {
  TRestaurant,
  TRestaurantReturn,
} from "../../schemas/restaurant.schema";

export const restaurantDefaultExpects = (
  restaurant: TRestaurantReturn,
  restaurantExpect: TRestaurant
) => {
  expect(restaurant).toBeDefined();
  expect(restaurant.id).toBe(restaurantExpect.id);
  expect(restaurant.name).toBe(restaurantExpect.name);
  expect(restaurant.email).toBe(restaurantExpect.email);
  expect(restaurant.description).toBe(restaurantExpect.description);
};

// Estamos criando um default de expectativas que se repetem no código
