import { Job, Worker } from "@repo/types";
import { REQUEST_QUEUE, RUN_REQUEST_JOB, SUBMISSION_REQUEST_JOB } from "../constants";
import { redisConnection, submissionJobHandler } from "../helper";

const requestQueueWorker = new Worker(
        REQUEST_QUEUE,
        async (job: Job) => {
            try{
                if(job.name === RUN_REQUEST_JOB)
                    return
                if(job.name === SUBMISSION_REQUEST_JOB)
                    await submissionJobHandler(job.data);
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
