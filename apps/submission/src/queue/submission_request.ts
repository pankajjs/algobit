import { SUBMISSION_REQUEST_QUEUE } from "../helper/constants";
import { redisConnection } from "../helper/redis";

import { createQueue } from "./queue_factory";

export const submissionRequestQueue = createQueue({
    name: SUBMISSION_REQUEST_QUEUE,
    options: redisConnection,
});
