import fp from "fastify-plugin";
import ip from "fastify-ip";

export interface FastifyIPOptions {
  order?: string[] | string;
  strict?: boolean;
  isAWS?: boolean;
}

declare module "fastify" {
  interface FastifyRequest {
    isIP(pseudo: string): boolean;
    isIPv4(pseudo: string): boolean;
    isIPv6(pseudo: string): boolean;
    inferIPVersion(pseudo: string): 0 | 4 | 6;
  }
}

export default fp(async (fastify) => {
  fastify.register(ip, {
    order: ["x-my-ip-header"],
    strict: false,
    isAWS: false,
  });
});
