import { Job, Worker } from "bullmq";
import { redisConnection } from "../helper/redis";
import { REQUEST_QUEUE } from "../helper/constants";
import { RequestJobPayload } from "../helper/types";
import { requestQueueJobHandler } from "../helper/job_handler";

const requestQueueWorker = new Worker(
        REQUEST_QUEUE,
        async (job: Job<RequestJobPayload> ) => {
            try{
                requestQueueJobHandler(job.name, job.data);
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
    requestQueueWorker
}
