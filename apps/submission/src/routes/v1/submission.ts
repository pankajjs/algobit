import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { SubmissionDao } from "../../dao";
import { SubmissionService } from "../../service";
import { SubmissionController } from "../../controller";

export const submissionDao = new SubmissionDao();
export const submissionService = new SubmissionService(submissionDao);
export const submissionController = new SubmissionController(submissionService);

export default async function SubmissionRoutes(
	fastify: FastifyInstance,
	_option: FastifyPluginOptions,
) {
	fastify.post("/", submissionController.create.bind(submissionController));
	fastify.get("/:id", submissionController.getOne.bind(submissionController));
	fastify.get("/", submissionController.getAll.bind(submissionController));
	fastify.patch(
		"/:id",
		submissionController.updateOne.bind(submissionController),
	);
}
