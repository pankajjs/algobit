import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { V1Routes } from "./v1";

async function ApiRoutes(fastify: FastifyInstance, _option: FastifyPluginOptions){
    fastify.register(V1Routes, {prefix: "/v1"})
}

export {
    ApiRoutes
}