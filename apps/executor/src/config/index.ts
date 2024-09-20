import dotenv from "dotenv";

dotenv.config();

const ServerConfig = {
    PORT: process.env.PORT || "5002",
    NODE_ENV: process.env.NODE_ENV || "development",
    REDIS_URI: process.env.REDIS_URI || "127.0.0.1:6379",
    ADMIN_SERVICE_URI: process.env.ADMIN_SERVICE_URI as string,
}

export default ServerConfig