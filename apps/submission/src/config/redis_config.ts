import { Redis } from "ioredis";                
import { ServerConfig } from "./server_config";

const redisConnection = new Redis(ServerConfig.REDIS_URI, {
    maxRetriesPerRequest: null
})  

export {
    redisConnection
}