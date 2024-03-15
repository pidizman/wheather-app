import { FastifyReply, FastifyRequest } from "fastify";

interface Route {
  method: "get" | "post";
  path: string;
  handler: (request: FastifyRequest, reply: FastifyReply) => {};
}

export const Routes: Route[] = [
  {
    method: "get",
    path: "/",
    handler: (request, reply) => reply.send({ hello: "world" }),
  },
];
