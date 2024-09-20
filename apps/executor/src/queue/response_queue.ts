
import { RESPONSE_QUEUE } from "../constants";
import { redisConnection } from "../helper";
import createQueue from "./queue_factory";

const responseQueue = createQueue({
    name: RESPONSE_QUEUE,
    options: redisConnection,
});

export default responseQueue;