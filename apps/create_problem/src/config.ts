import dotenv from "dotenv";

dotenv.config();

const ServerConfig = {
    PORT: process.env.PORT || "3001",
    NODE_ENV : process.env.NODE_ENV || "development",
}

export {
    ServerConfig
}