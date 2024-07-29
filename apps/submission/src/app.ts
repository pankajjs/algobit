import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ApiRoutes } from "./routes";

async function app(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    fastify.register(ApiRoutes, {prefix: "/api"});
}

export  {
    app
}