import { prisma } from "../../database/prisma";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.restaurant.deleteMany(),
    prisma.recipe.deleteMany(),
    prisma.category.deleteMany(),
  ]);
});
