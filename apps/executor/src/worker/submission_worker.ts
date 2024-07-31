import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { JobPayload } from "../helper/types";
import { codeExecutorFactory } from "../code_executor/factory";
import { SUBMISSION_REQUEST_QUEUE } from "../helper/constants";

const submissionWorker = new Worker(
        SUBMISSION_REQUEST_QUEUE,
        async (job: Job<JobPayload> ) => {
            const executor = codeExecutorFactory(job.data.language);
            const response = await executor.execute(job.data)
            console.log(response);
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    submissionWorker
}
