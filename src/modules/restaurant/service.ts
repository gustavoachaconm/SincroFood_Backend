import { FastifyInstance } from "fastify";
import { createRestaurantSchema } from "./schema.js";

export async function createRestaurant(
  app: FastifyInstance,
  userId: string,
  body: unknown
) {
  const data = createRestaurantSchema.parse(body);
  return app.prisma.restaurant.create({
    data: { name: data.name, user_id: userId, type_id: data.type_id ?? null },
  });
}

export async function myRestaurants(app: FastifyInstance, userId: string) {
  return app.prisma.restaurant.findMany({ where: { user_id: userId } });
}
