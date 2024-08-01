import dotenv from "dotenv";

dotenv.config();

export const ServerConfig = {
    PORT: process.env.PORT || "3004",
    NODE_ENV: process.env.NODE_ENV,
    REDIS_URI: process.env.REDIS_URI || "127.0.0.1:6379",
}