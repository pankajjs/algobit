import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import SubmissionRoutes from "./submission";
import RunRoutes from "./run";

export default async function V1Routes(
	fastify: FastifyInstance,
	_option: FastifyPluginOptions,
) {
	fastify.register(SubmissionRoutes, { prefix: "/submissions" });
	fastify.register(RunRoutes, { prefix: "/run" });
}
