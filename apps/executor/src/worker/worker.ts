import { type Job, Worker } from "@repo/types";
import { REQUEST_QUEUE } from "../constants";
import { redisConnection } from "../helper";
import jobHandler from "../helper/job_handler";

const requestQueueWorker = new Worker(
	REQUEST_QUEUE,
	async (job: Job) => {
		try {
			await jobHandler(job);
		} catch (error) {
			logger.error(`Error while handling ${job.name}: ${error}`);
		}
	},
	{
		connection: redisConnection,
		autorun: false,
		concurrency: 5
	},
);

export default requestQueueWorker;
