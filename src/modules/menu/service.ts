import { FastifyInstance } from "fastify";
import { createCategorySchema, createItemSchema } from "./schema.js";

export async function createCategorySvc(
  app: FastifyInstance,
  userId: string,
  body: unknown
) {
  const data = createCategorySchema.parse(body);
  const r = await app.prisma.restaurant.findFirst({
    where: { id: data.restaurant_id, user_id: userId },
  });
  if (!r) throw app.httpErrors.forbidden();

  return app.prisma.menu_category.create({
    data: {
      restaurant_id: data.restaurant_id,
      name: data.name,
      description: data.descriptionCategory ?? null,
    },
  });
}

export async function createItemSvc(
  app: FastifyInstance,
  userId: string,
  body: unknown
) {
  const data = createItemSchema.parse(body);
  const cat = await app.prisma.menu_category.findFirst({
    where: { id: data.category_id, restaurant: { user_id: userId } },
  });
  if (!cat) throw app.httpErrors.forbidden();

  return app.prisma.menu_item.create({
    data: {
      category_id: data.category_id,
      name: data.name,
      description: data.descriptionItem ?? null,
    },
  });
}

export async function getMenuByRestaurantSvc(
  app: FastifyInstance,
  restaurantId: string
) {
  return app.prisma.menu_category.findMany({
    where: { restaurant_id: restaurantId, is_active: true },
    include: { items: true },
  });
}
