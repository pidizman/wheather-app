import { scrapeData } from "@repo/scraper";
import { FastifyReply, FastifyRequest } from "fastify";

export const Home = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = await scrapeData(String(process.env.URL));

  return reply.send(data);
};
