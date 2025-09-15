import { FastifyPluginAsync } from "fastify";
import { register, login } from "./service.js";

const routes: FastifyPluginAsync = async (app) => {
  app.post("/register", async (req, reply) =>
    reply.send(await register(app, req.body))
  );
  app.post("/login", async (req, reply) =>
    reply.send(await login(app, req.body))
  );
};
export default routes;
