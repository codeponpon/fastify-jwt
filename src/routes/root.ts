import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (req, reply) {
    return { root: true };
  });

  fastify.post("/sign", (req, reply) => {
    const { payload }: any = req.body;
    const token = fastify.jwt.sign(payload);
    reply.send({ token });
  });

  fastify.get(
    "/protected",
    {
      onRequest: [fastify.authenticate],
    },
    async function (request, reply) {
      return request.user;
    }
  );
};

export default root;
