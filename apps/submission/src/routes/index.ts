import { FastifyInstance, FastifyPluginOptions } from "fastify";
import V1Routes from "./v1";

export default async function ApiRoutes(fastify: FastifyInstance, _option: FastifyPluginOptions){
    fastify.register(V1Routes, {prefix: "/v1"})
}
