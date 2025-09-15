import "dotenv/config";
import Fastify from "fastify";
import sensible from "@fastify/sensible";
import jwt from "@fastify/jwt";
import prismaPlugin from "./providers/db/prisma.js";
import authPlugin from "./providers/auth/auth.js";

import authRoutes from "./modules/auth/routes.js";
import restaurantRoutes from "./modules/restaurant/routes.js";
import locationRoutes from "./modules/location/routes.js";
import menuRoutes from "./modules/menu/routes.js";

const app = Fastify({ logger: true });

await app.register(sensible);
await app.register(jwt, { secret: process.env.JWT_SECRET! });
await app.register(prismaPlugin);
await app.register(authPlugin);

app.get("/health", async () => ({ ok: true }));

await app.register(authRoutes, { prefix: "/auth" });
await app.register(restaurantRoutes, { prefix: "/restaurant" });
await app.register(locationRoutes, { prefix: "/location" });
await app.register(menuRoutes, { prefix: "/menu" });

const port = Number(process.env.PORT || 3000);
await app.listen({ port, host: "0.0.0.0" });
