import { prisma } from "../../database/prisma";

beforeEach(async () => {
  await prisma.$transaction([
    prisma.recipe.deleteMany(),
    prisma.category.deleteMany(),
    prisma.restaurant.deleteMany()
  ]);
});
