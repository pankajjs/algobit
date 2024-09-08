
import { RESPONSE_QUEUE } from "../helper/constants";
import { redisConnection } from "../helper/redis";
import { createQueue } from "./queue_factory";

const responseQueue = createQueue({
    name: RESPONSE_QUEUE,
    options: redisConnection,
});

export {
    responseQueue,
}