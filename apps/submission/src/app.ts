import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import cors from "@fastify/cors";
import logger from "@repo/logger";
import ApiRoutes from "./routes";
import { errorHandler } from "./helper";

logger.defaultMeta = { service: "request-service" };
global.logger = logger;

async function app(fastify: FastifyInstance, _options: FastifyPluginOptions) {
	await fastify.register(cors, {
		origin: "*",
	});
	await fastify.register(ApiRoutes, { prefix: "/api" });
	fastify.setErrorHandler(errorHandler);
}

export default app;
