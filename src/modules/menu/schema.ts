import { z } from "zod";

export const createCategorySchema = z.object({
  restaurant_id: z.uuid(),
  name: z.string().min(2).toUpperCase(),
  descriptionCategory: z.string().toUpperCase().optional(),
});

export const createItemSchema = z.object({
  category_id: z.uuid(),
  name: z.string().min(2).toUpperCase(),
  descriptionItem: z.string().toUpperCase().optional(),
});
