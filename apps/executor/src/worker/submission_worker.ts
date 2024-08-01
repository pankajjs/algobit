import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { SUBMISSION_REQUEST_QUEUE } from "../helper/constants";
import { RequestJobPayload } from "../helper/types";
import { submissionRequestJobHandler } from "../helper/job_handler";

const submissionWorker = new Worker(
        SUBMISSION_REQUEST_QUEUE,
        async (job: Job<RequestJobPayload> ) => {
            try{
                await submissionRequestJobHandler(job.data);
            }catch(error){
                console.log(error);
                throw error;
            }
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export {
    submissionWorker
}
