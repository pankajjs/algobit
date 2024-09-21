import type { ISubmission, ISubmissionService } from "@repo/types";
import type { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

export default class SubmissionController {
	private submissionService: ISubmissionService;

	constructor(submissionService: ISubmissionService) {
		this.submissionService = submissionService;
	}

	async getOne(req: FastifyRequest, res: FastifyReply) {
		try {
			const { id } = req.params as { id: string };

			const submission = await this.submissionService.findOne(id);

			return res.status(StatusCodes.OK).send({
				success: true,
				message: "Successfully fetched a submission",
				submission,
			});
		} catch (error) {
			logger.error(`Error while fetching a submission: ${error}`);
			throw error;
		}
	}

	async getAll(req: FastifyRequest, res: FastifyReply) {
		try {
			const { userId } = req.query as { userId: string };

			let submissions: ISubmission[] = [];

			if (userId) {
				submissions = await this.submissionService.findAllByUserId(userId);
			} else submissions = await this.submissionService.findAll();

			return res.status(StatusCodes.OK).send({
				success: true,
				message: "Successfully fetched all submission",
				submissions,
			});
		} catch (error) {
			logger.error(`Error while fetching all submissions: ${error}`);
			throw error;
		}
	}

	async create(req: FastifyRequest, res: FastifyReply) {
		try {
			const body: any = req.body;

			const submission = await this.submissionService.create(body);

			return res.status(StatusCodes.CREATED).send({
				success: true,
				message: "Successfully created a submission request",
				submission,
			});
		} catch (error) {
			logger.error(`Error while creating a submission: ${error}`);
			throw error;
		}
	}

	async updateOne(req: FastifyRequest, res: FastifyReply) {
		try {
			const body: any = req.body;
			const { id } = req.params as { id: string };

			const submission = await this.submissionService.updateOne(id, body);

			return res.status(StatusCodes.OK).send({
				success: true,
				message: "Successfully updated a submission",
				submission,
			});
		} catch (error) {
			logger.error(`Error while updating a submission: ${error}`);
			throw error;
		}
	}
}
