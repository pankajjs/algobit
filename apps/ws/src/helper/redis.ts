import { Redis } from "ioredis";                
import { ServerConfig } from "../config/server_config";

const redis = new Redis(ServerConfig.REDIS_URI, {
    maxRetriesPerRequest: null
})

export {
    redis
}