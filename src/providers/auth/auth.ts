import fp from "fastify-plugin";

export default fp(async (app) => {
  app.decorate("authRequired", async (req) => {
    try {
      await req.jwtVerify();
    } catch {
      app.httpErrors.unauthorized();
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authRequired: (req: FastifyRequest) => Promise<void>;
  }
}
