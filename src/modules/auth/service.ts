import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "./schema.js";

export async function register(app: FastifyInstance, body: unknown) {
  const data = registerSchema.parse(body);
  const existing = await app.prisma.user_auth.findUnique({
    where: { email: data.email },
  });
  if (existing) throw app.httpErrors.badRequest("Email already in use");

  const user = await app.prisma.user.create({
    data: {
      name: data.name,
      second_name: data.second_name,
      last_name: data.last_name,
      second_last_name: data.second_last_name,
      country_id: data.country_id,
    },
  });

  const hash = await bcrypt.hash(data.password, 10);
  await app.prisma.user_auth.create({
    data: { user_id: user.id, email: data.email, password_hash: hash },
  });

  const token = app.jwt.sign({ sub: user.id, email: data.email });
  return {
    token,
    user: {
      id: user.id,
      name: data.name,
      second_name: data.second_name,
      last_name: data.last_name,
      second_last_name: data.second_last_name,
      email: data.email,
    },
  };
}

export async function login(app: FastifyInstance, body: unknown) {
  const { email, password } = loginSchema.parse(body);
  const auth = await app.prisma.user_auth.findUnique({ where: { email } });
  if (!auth) throw app.httpErrors.unauthorized();

  const ok = await bcrypt.compare(password, auth.password_hash);
  if (!ok) throw app.httpErrors.unauthorized();

  const token = app.jwt.sign({ sub: auth.user_id, email });
  const user = await app.prisma.user.findUnique({
    where: { id: auth.user_id },
  });
  return { token, user: { id: user!.id, name: user!.name, email } };
}
