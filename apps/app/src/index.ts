import Fastify, { FastifyInstance } from "fastify";
import { config } from "dotenv";
import { Routes } from "./routes";
import { scrape } from "@repo/scraper";
config({});

const fastify: FastifyInstance = Fastify();

Routes.map((v) => {
  fastify[v.method](v.path, v.handler);
});

fastify.listen(
  { port: Number(process.env.PORT), host: "localhost" },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`);
  },
);

scrape(String(process.env.URL));
setInterval(async () => {
  scrape(String(process.env.URL));
}, 3600000);
