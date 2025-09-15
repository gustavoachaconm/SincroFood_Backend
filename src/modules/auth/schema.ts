import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).toUpperCase(),
  second_name: z.string().min(2).toUpperCase().optional(),
  last_name: z.string().min(2).toUpperCase().optional(),
  second_last_name: z.string().min(2).toUpperCase().optional(),
  email: z.email().toUpperCase(),
  password: z.string().min(6),
  country_id: z.number(),
});

export const loginSchema = z.object({
  email: z.email().toUpperCase(),
  password: z.string().min(6),
});
