import express, { urlencoded } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "@repo/logger";
import apiRouter from "./routes";
import { errorHandler } from "./helper";

logger.defaultMeta = { service: "admin-service" };
global.logger = logger;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(urlencoded({ extended: true }));
app.use("/api", apiRouter);

app.get("/healthcheck", (_req, res) => {
	return res.status(StatusCodes.OK).send("Admin service is alive.");
});

app.use(errorHandler);

export default app;
