import fp from "fastify-plugin";
import rateLimit from "@fastify/rate-limit";

export default fp(async (fastify) => {
  // https://github.com/fastify/fastify-rate-limit
  fastify.register(rateLimit, { max: 100, timeWindow: "1 minute" });
});
