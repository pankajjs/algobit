import dotenv from "dotenv";

dotenv.config();

const ServerConfig = {
    PORT: Number(process.env.PORT) || "5003",
    NODE_ENV: process.env.NODE_ENV || "development",
    REDIS_URI: process.env.REDIS_URI || "127.0.0.1:6379",
    WS_SERVICE_URI: process.env.WS_SERVICE_URI as string,
}

export {
    ServerConfig
}