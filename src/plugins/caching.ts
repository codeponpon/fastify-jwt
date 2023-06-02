import fp from "fastify-plugin";
import fastifyCaching from "@fastify/caching";

export default fp(async (fastify) => {
  // http://staff.cs.psu.ac.th/noi/cs323-554/2-2544/Web%20Caching.pdf
  // https://datatracker.ietf.org/doc/html/rfc2616#section-14.9
  fastify.register(fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE });
});
