import express, { urlencoded } from "express";
import { errorHandler } from "./helper/middleware";
import { StatusCodes } from "http-status-codes";
import { apiRouter } from "./routes";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(urlencoded({extended : true}));
app.use("/api", apiRouter);

app.get("/healthcheck", (_req, res) => {
    return res.status(StatusCodes.OK).send("Admin service is alive.");
})

app.use(errorHandler);

export { app }