import { FastifyPluginAsync } from "fastify";
import {
  createCategorySvc,
  createItemSvc,
  getMenuByRestaurantSvc,
} from "./service.js";

const routes: FastifyPluginAsync = async (app) => {
  app.post(
    "/createCategory",
    { preHandler: [app.authRequired] },
    async (req, reply) => {
      const userId = (req.user as any).sub;
      reply.code(201).send(await createCategorySvc(app, userId, req.body));
    }
  );

  app.post(
    "/createItem",
    { preHandler: [app.authRequired] },
    async (req, reply) => {
      const userId = (req.user as any).sub;
      reply.code(201).send(await createItemSvc(app, userId, req.body));
    }
  );

  app.get(
    "/by-restaurant/:id",
    { preHandler: [app.authRequired] },
    async (req, reply) => {
      const { id } = req.params as any;
      reply.send(await getMenuByRestaurantSvc(app, id));
    }
  );
};
export default routes;
