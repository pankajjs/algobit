import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { codeExecutorFactory } from "../code_executor/factory";
import { SUBMISSION_REQUEST_QUEUE, SUBMISSION_RESPONSE_JOB } from "../helper/constants";
import { publishJob } from "../helper/publisher";
import { submissionResponseQueue } from "../queue/submission_response";
import { RequestJobPayload } from "../helper/types";

const submissionWorker = new Worker(
        SUBMISSION_REQUEST_QUEUE,
        async (job: Job<RequestJobPayload> ) => {
            const executor = codeExecutorFactory(job.data.language);
            const response = await executor.execute(job.data)
            
            console.log(response);
            
            await publishJob({
                name: SUBMISSION_RESPONSE_JOB,
                queue: submissionResponseQueue,
                payload: {
                    status: response.status,
                    submissionId: response.submissionId,
                }
            })
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    submissionWorker
}
