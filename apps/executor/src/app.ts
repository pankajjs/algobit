import express from "express";

const app = express();

app.get("/healthcheck", (_, res)=>{
    return res.status(200).send("Executor service is alive.");
})

export {
    app
}