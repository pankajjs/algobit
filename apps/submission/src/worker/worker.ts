import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { RESPONSE_QUEUE, RUN_RESPONSE_JOB } from "../helper/constants";
import { ResponseJobPayload, Status, SubmissionResponsePayload } from "../helper/types";
import { db } from "../helper/db";
import { sendResponse } from "../api/submission_response";

const worker = new Worker(
        RESPONSE_QUEUE,
        async (job: Job<ResponseJobPayload>) => {
            
            if(job.name === RUN_RESPONSE_JOB){
                await sendResponse(job.data, "Run");
                return;
            }

            const status = job.data.status;
            let submission;

            if(status === Status.WA){
               submission = await db.submission.update({
                    where: {
                        id: job.data.id,
                    },
                    data: {
                        status: status,
                        expectedOutput: job.data.expectedOutput?.[0],
                        input: job.data.input?.[0],
                        output: job.data.output?.[0],
                    }
                })
              
            }else{
                submission =  await db.submission.update({
                    where: {
                        id: job.data.id,
                    },
                    data: {
                        status: status,
                        error: job.data.error,
                    }
                })
            }

            let response: SubmissionResponsePayload  = {
                ...job.data,
                code: submission.code,
                createdAt: submission.createdAt,
                id: submission.id,
                language: submission.language,
                problemId: submission.problemId,
                userId: submission.userId,
            }

            console.log(response)
            await sendResponse(response, "Submit");
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    worker
}
