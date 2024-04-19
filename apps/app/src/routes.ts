import { FastifyReply, FastifyRequest } from "fastify";
import { Home } from "./routes/home";

interface Route {
  method: "get" | "post";
  path: string;
  handler: (request: FastifyRequest, reply: FastifyReply) => {};
}

export const Routes: Route[] = [
  {
    method: "get",
    path: "/",
    handler: Home,
  },
];
