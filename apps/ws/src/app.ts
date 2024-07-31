import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

app.get("/healthcheck", (_, res)=>{
    return res.status(200).send("Ws service is alive.")
})

export {
    server,
}