import { z } from "zod";
export const createLocationSchema = z.object({
  restaurant_id: z.uuid(),
  name: z.string().min(2).toUpperCase(),
  address: z.string().toUpperCase(),
});
