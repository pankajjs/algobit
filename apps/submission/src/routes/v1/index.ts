import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { SubmissionRoutes } from "./submission_routes";

async function V1Routes(fastify: FastifyInstance, _option: FastifyPluginOptions){
   fastify.register(SubmissionRoutes, {prefix:"/submissions"});
}

export {
    V1Routes
}