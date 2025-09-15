import { FastifyPluginAsync } from "fastify";
import { createLocationSvc } from "./service.js";

const routes: FastifyPluginAsync = async (app) => {
  app.post(
    "/create",
    { preHandler: [app.authRequired] },
    async (req, reply) => {
      const userId = (req.user as any).sub;
      const loc = await createLocationSvc(app, userId, req.body);
      reply.code(201).send(loc);
    }
  );
};
export default routes;
