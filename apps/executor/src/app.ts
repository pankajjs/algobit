import express from "express";
import { SUCCESS_STATUS_CODE } from "./constants";
import logger from "@repo/logger";

const app = express();

logger.defaultMeta = {service: "executor-service"};
global.logger = logger

app.get("/healthcheck", (_, res)=>{
    return res.status(SUCCESS_STATUS_CODE).send("Executor service is alive.");
})

export default app;