import { Redis } from "ioredis";
import ServerConfig from "../config";

const redisConnection = new Redis(ServerConfig.REDIS_URI, {
    maxRetriesPerRequest: null
})  

export default redisConnection;