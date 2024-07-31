
import { SUBMISSION_RESPONSE_QUEUE } from "../helper/constants";
import { redisConnection } from "../helper/redis";
import { createQueue } from "./queue_factory";

const submissionResponseQueue = createQueue({
    name: SUBMISSION_RESPONSE_QUEUE,
    options: redisConnection,
});

export {
    submissionResponseQueue,
}