import { z } from "zod";

export const restaurantSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().optional(),
    email: z.string().email().min(1),
    password: z.string().min(1)
});

export type TRestaurant = z.infer<typeof restaurantSchema>;

export const restaurantRegisterBodySchema = restaurantSchema.omit({ id: true, description: true })

export type TRestaurantRegisterBody = z.infer<typeof restaurantRegisterBodySchema>

export const restaurantLoginSchema = restaurantSchema.pick({ email: true, password: true })

export type TRestaurantLogin = z.infer<typeof restaurantLoginSchema>

export const restaurantReturnSchema = restaurantSchema.omit({ password: true })

export type TRestaurantReturn = z.infer<typeof restaurantReturnSchema>

export const updateRestaurantBodySchema = restaurantSchema.pick({ description: true })

export type TRestaurantUpdateBody = z.infer<typeof updateRestaurantBodySchema>

export type TRestaurantLoginReturn = {
    accessToken: string;
    restaurant: TRestaurantReturn
}

export const publicRestaurantReturn = restaurantSchema.pick({id: true, name: true, description: true})

export type TPublicRestaurant = z.infer<typeof publicRestaurantReturn>