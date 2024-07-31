import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ApiRoutes } from "./routes";
import { errorHandler } from "./helper/middleware";

async function app(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.register(ApiRoutes, {prefix: "/api"});
    fastify.setErrorHandler(errorHandler)
}

export  {
    app
}