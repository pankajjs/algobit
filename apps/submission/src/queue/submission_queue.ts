import { redisConnection } from "../config/redis_config";
import { SUBMISSION_QUEUE_NAME } from "../constants";

import { createQueue } from "./queue_factory";

const submissionQueue = createQueue({
    name: SUBMISSION_QUEUE_NAME,
    options: redisConnection,
});

export {
    submissionQueue,
}