import { FastifyPluginAsync } from "fastify";
import { createRestaurant, myRestaurants } from "./service.js";

const routes: FastifyPluginAsync = async (app) => {
  app.post(
    "/create",
    { preHandler: [app.authRequired] },
    async (req, reply) => {
      const userId = (req.user as any).sub;
      const r = await createRestaurant(app, userId, req.body);
      reply.code(201).send(r);
    }
  );

  app.get("/mine", { preHandler: [app.authRequired] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    reply.send(await myRestaurants(app, userId));
  });
};
export default routes;
