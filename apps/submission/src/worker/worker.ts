import { Job, RunResponseJobPayload, SubmissionResponsePayload, Task, Worker } from "@repo/types";
import { sendResponse } from "../api";
import { RESPONSE_QUEUE, RUN_RESPONSE_JOB } from "../constants";
import redisConnection from "../helper/redis";
import { submissionService } from "../routes/v1/submission";

const worker = new Worker(
        RESPONSE_QUEUE,
        async (job: Job<RunResponseJobPayload | SubmissionResponsePayload>) => {
            
            if(job.name === RUN_RESPONSE_JOB){
                await sendResponse(job.data, Task.RUN);
                return;
            }

            const submission = await submissionService.updateOne(job.data.id, {
                status: job.data.status,
                error: job.data.error,
                expectedOutput: job.data.expectedOutput?.[0],
                input: job.data.input?.[0],
                output: job.data.output?.[0],
            })

            if(!submission){
                return;
            }

            // if(status === Status.WA){
            //    submission = await db.submission.update({
            //         where: {
            //             id: job.data.id,
            //         },
            //         data: {
            //             status: status,
            //             expectedOutput: job.data.expectedOutput?.[0],
            //             input: job.data.input?.[0],
            //             output: job.data.output?.[0],
            //         }
            //     })
              
            // }else{
            //     submission =  await db.submission.update({
            //         where: {
            //             id: job.data.id,
            //         },
            //         data: {
            //             status: status,
            //             error: job.data.error,
            //         }
            //     })
            // }

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
            await sendResponse(response, Task.SUBMIT);
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export default worker;