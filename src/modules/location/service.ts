import { FastifyInstance } from "fastify";
import { createLocationSchema } from "./schema.js";

export async function createLocationSvc(
  app: FastifyInstance,
  userId: string,
  body: unknown
) {
  const data = createLocationSchema.parse(body);

  const r = await app.prisma.restaurant.findFirst({
    where: { id: data.restaurant_id, user_id: userId },
  });
  if (!r) throw app.httpErrors.forbidden("Restaurant not found or not yours");

  return app.prisma.location.create({
    data: {
      restaurant_id: data.restaurant_id,
      name: data.name,
      address: data.address,
    },
  });
}
