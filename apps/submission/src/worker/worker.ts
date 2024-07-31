import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { SUBMISSION_RESPONSE_QUEUE } from "../helper/constants";
import { ResponseJobPayload } from "../helper/types";
import { db } from "../helper/db";
import { getStatus } from "../helper/get_status";

const worker = new Worker(
        SUBMISSION_RESPONSE_QUEUE,
        async (job: Job<ResponseJobPayload>) => {
            
            const submission = await db.submission.update({
                where: {
                    id: job.data.submissionId,
                },
                data: {
                    status: getStatus(job.data.status)
                }
            })
            console.log(submission);

        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    worker
}
