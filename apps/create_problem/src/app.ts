import express, { urlencoded } from "express";
import { errorHandler } from "./middleware";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(urlencoded({extended : true}));

app.get("/healthcheck", (_req, res) => {
    return res.status(StatusCodes.OK).send("Create Problem service is alive.");
})

app.use(errorHandler);

export { app }