import { test } from "tap";
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { createSigner } from "fast-jwt";
import jwt from "@fastify/jwt";

test("sign and verify with trusted token", function (t) {
  t.plan(2);
  t.test("Trusted token verification", function (t) {
    t.plan(2);

    const f: FastifyInstance = Fastify();
    f.register(jwt, {
      secret: "test",
      trusted: (request, { jti }) => jti !== "untrusted",
    });

    f.get("/", (request: FastifyRequest, reply: FastifyReply) => {
      request
        .jwtVerify()
        .then(function (decodedToken: any) {
          t.same(decodedToken, {
            foo: "bar",
            jti: "trusted",
            iat: decodedToken?.iat,
          });
          return reply.send(decodedToken);
        })
        .catch(function (error) {
          return reply.send(error);
        });
    });

    const signer = createSigner({ key: "test", jti: "trusted" });
    const trustedToken = signer({ foo: "bar" });
    f.inject({
      method: "get",
      url: "/",
      headers: {
        authorization: `Bearer ${trustedToken}`,
      },
    }).then(function (response) {
      t.equal(response.statusCode, 200);
    });
  });

  t.test("Trusted token - async verification", function (t) {
    t.plan(2);

    const f: FastifyInstance = Fastify();
    f.register(jwt, {
      secret: "test",
      trusted: (request, { jti }) => Promise.resolve(jti !== "untrusted"),
    });
    f.get("/", (request: FastifyRequest, reply: FastifyReply) => {
      request
        .jwtVerify()
        .then(function (decodedToken: any) {
          t.same(decodedToken, {
            foo: "bar",
            jti: "trusted",
            iat: decodedToken?.iat,
          });
          return reply.send(decodedToken);
        })
        .catch(function (error) {
          return reply.send(error);
        });
    });

    const signer = createSigner({ key: "test", jti: "trusted" });
    const trustedToken = signer({ foo: "bar" });
    f.inject({
      method: "get",
      url: "/",
      headers: {
        authorization: `Bearer ${trustedToken}`,
      },
    }).then(function (response) {
      t.equal(response.statusCode, 200);
    });
  });
});
