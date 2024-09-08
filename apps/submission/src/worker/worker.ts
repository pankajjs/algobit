import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { SUBMISSION_RESPONSE_QUEUE } from "../helper/constants";
import { ResponseJobPayload, SubmissionResponsePayload } from "../helper/types";
import { db } from "../helper/db";
import { getStatus } from "../helper/get_status";
import { sendSubmissionResponse } from "../api/submission_response";

const worker = new Worker(
        SUBMISSION_RESPONSE_QUEUE,
        async (job: Job<ResponseJobPayload>) => {
            
            const status = getStatus(job.data.status);
            let response: SubmissionResponsePayload;

            if(status === "WA"){
                const submission = await db.submission.update({
                    where: {
                        id: job.data.id,
                    },
                    data: {
                        status: status,
                        expectedOutput: job.data.expectedOutput,
                        input: job.data.input?.toString(),
                        output: job.data.output?.toString(),
                    }
                })
                response = {
                        code: submission.code,
                        createdAt: submission.createdAt,
                        id: submission.id,
                        language: submission.language,
                        problemId: submission.problemId,
                        status: submission.status,
                        userId: submission.userId,
                        error: submission.error??undefined,
                        expectedOutput: job.data.expectedOutput,
                        input: job.data.input,
                        output: job.data.output
                }
            }else{
                const submission =  await db.submission.update({
                    where: {
                        id: job.data.id,
                    },
                    data: {
                        status: status,
                        error: job.data.error,
                    }
                })

                response = {
                    code: submission.code,
                    createdAt: submission.createdAt,
                    id: submission.id,
                    language: submission.language,
                    problemId: submission.problemId,
                    status: submission.status,
                    userId: submission.userId,
                    error: submission.error??undefined,
                }
            }

            sendSubmissionResponse(response);
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    worker
}
