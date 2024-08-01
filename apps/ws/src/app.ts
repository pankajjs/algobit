import express from "express";
import { createServer } from "http";
import StatusCodes from "http-status-codes";
import { errorHandler } from "./helper/middleware";

const app = express();

app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended: true}));

const server = createServer(app);

app.get("/healthcheck", (_, res)=>{
    return res.status(StatusCodes.OK).send("Ws service is alive.")
})

app.use(errorHandler);

export {
    server,
}