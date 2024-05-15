import { readOutputJson } from "@repo/scraper";
import { FastifyReply, FastifyRequest } from "fastify";

export const Read = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = await readOutputJson();

  return reply.send(data);
};
