import { z } from "zod";
export const createRestaurantSchema = z.object({
  name: z.string().min(2).toUpperCase(),
  type_id: z.number().optional(),
});
