import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { RESPONSE_QUEUE, RUN_RESPONSE_JOB, SUBMISSION_RESPONSE_JOB } from "../helper/constants";
import { ResponseJobPayload, SubmissionResponsePayload } from "../helper/types";
import { db } from "../helper/db";
import { getStatus } from "../helper/get_status";
import { sendResponse } from "../api/submission_response";

const worker = new Worker(
        RESPONSE_QUEUE,
        async (job: Job<ResponseJobPayload>) => {
            
            if(job.name === RUN_RESPONSE_JOB){
                await sendResponse(job.data, true);
                return;
            }

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
                        ...job.data,
                        code: submission.code,
                        createdAt: submission.createdAt,
                        id: submission.id,
                        language: submission.language,
                        problemId: submission.problemId,
                        status: submission.status,
                        userId: submission.userId,
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
            await sendResponse(response, false);
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    worker
}
