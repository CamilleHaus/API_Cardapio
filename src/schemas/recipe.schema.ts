import { z } from "zod";

export const recipeSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    restaurantId: z.string().min(1),
    categoryId: z.string().optional().nullable()
});

// opitional = undefined / nullable = null

export type TRecipe = z.infer<typeof recipeSchema>

export const recipeCreateBodySchema = recipeSchema.omit({id: true, restaurantId: true})

export type TRecipeCreateBody = z.infer<typeof recipeCreateBodySchema>

export const recipeUpdateBodySchema = recipeCreateBodySchema.partial()

export type TRecipeUpdateBody = z.infer<typeof recipeUpdateBodySchema>