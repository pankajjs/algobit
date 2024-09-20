import { Job, Worker } from "@repo/types";
import { REQUEST_QUEUE } from "../constants";
import { redisConnection } from "../helper";
import jobHandler from "../helper/job_handler";

const requestQueueWorker = new Worker(
        REQUEST_QUEUE,
        async (job: Job) => {
            try{
               await jobHandler(job);
            }catch(error: any){
                logger.error(`Error while handling ${job.name}: ${error.message}`);
            }
        },
        {
            connection: redisConnection,
            autorun: false,
        }
);

export default requestQueueWorker;
