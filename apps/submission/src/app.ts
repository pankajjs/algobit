import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ApiRoutes } from "./routes";
import { errorHandler } from "./helper/middleware";
import cors from '@fastify/cors'

async function app(fastify: FastifyInstance, _options: FastifyPluginOptions) {
    await fastify.register(cors, {
        origin: "*"
    })
    await fastify.register(ApiRoutes, {prefix: "/api"});
    fastify.setErrorHandler(errorHandler)
}

export  {
    app
}