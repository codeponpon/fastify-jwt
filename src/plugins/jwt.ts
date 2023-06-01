import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { JSONType } from "ajv";

export default fp(async (fastify) => {
  fastify.register(jwt, { secret: "supersecret" });

  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): JSONType;
  }
}
