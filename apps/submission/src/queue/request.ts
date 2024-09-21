import { REQUEST_QUEUE } from "../constants";
import redisConnection from "../helper/redis";
import createQueue from "./queue_factory";

const requestQueue = createQueue({
	name: REQUEST_QUEUE,
	options: redisConnection,
});

export default requestQueue;
