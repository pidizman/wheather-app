import Fastify, { FastifyInstance } from "fastify";
import { config } from "dotenv";
import { Routes } from "./routes";
config({});

const fastify: FastifyInstance = Fastify();

Routes.map((v) => {
  fastify[v.method](v.path, v.handler);
});

fastify.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
