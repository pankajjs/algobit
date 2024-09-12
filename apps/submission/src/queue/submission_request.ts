import { REQUEST_QUEUE } from "../helper/constants";
import { redisConnection } from "../helper/redis";

import { createQueue } from "./queue_factory";

export const requestQueue = createQueue({
    name: REQUEST_QUEUE,
    options: redisConnection,
});
