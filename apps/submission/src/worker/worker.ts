import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { SUBMISSION_RESPONSE_QUEUE } from "../helper/constants";
import { ResponseJobPayload } from "../helper/types";
import { db } from "../helper/db";
import { getStatus } from "../helper/get_status";
import { sendSubmissionResponse } from "../api/submission_response";

const worker = new Worker(
        SUBMISSION_RESPONSE_QUEUE,
        async (job: Job<ResponseJobPayload>) => {
            
            const status = getStatus(job.data.status);

            const submission = await db.submission.update({
                where: {
                    id: job.data.id,
                },
                data: {
                    status: status,
                    error: job.data.error,
                }
            })
            console.log(job.data)
            await sendSubmissionResponse({
               userId: submission.userId,
               ...job.data,
            });
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    worker
}
