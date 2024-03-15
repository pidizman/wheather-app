import Fastify, { FastifyInstance } from "fastify";
import { config } from "dotenv";
import { Routes } from "./routes";
config({});

const fastify: FastifyInstance = Fastify();

fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

fastify.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

Routes.map((v) => {
  fastify[v.method](v.path, v.handler);
});
