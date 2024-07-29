import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function SubmissionRoutes(fastify: FastifyInstance, _option: FastifyPluginOptions){
    fastify.get("/ping", async function (_req, res){
        return res.send("[SubmissinController]: pong");
    });
}

export {
    SubmissionRoutes
}