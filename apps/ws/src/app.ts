import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import StatusCodes from "http-status-codes";
import { Server } from "socket.io";
import { errorHandler, redisConnection } from "./helper";
import logger from "@repo/logger";
import { Task } from "@repo/types";
import { NotFoundError } from "@repo/error";

logger.defaultMeta = {service: "websocket-service"};
global.logger = logger

const app = express();

app.use(express.json())
app.use(express.text());
app.use(express.urlencoded({extended: true}));

const server = createServer(app);

app.get("/healthcheck", (_, res)=>{
    return res.status(StatusCodes.OK).send("Ws service is alive.")
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
}});

io.on("connection", (socket)=>{
    socket.on("user_joined", (data)=>{
        const userId = data;
        redisConnection.set(userId, socket.id)
        redisConnection.set(socket.id, userId);
        logger.info(`"User joined! userId:${userId} socketId:${socket.id}`);
    })
  
    socket.on("disconnect", async () => {
        const userId = await redisConnection.get(socket.id);
        if (userId) {
            redisConnection.del(userId);
            redisConnection.del(socket.id);
        }
        logger.info(`User disconnected! userId:${userId} socketId:${socket.id}`);
    });
})

app.post("/response", async (req:Request, res: Response, next: NextFunction) => {
    try {
        const task = req.query.task as string;
        const data = req.body;

        let id:string = data.userId;
        let event:string = "submission-response";
        
        if(task === Task.RUN){
            id = data.id;
            event = "run-response";
        }
        
        const socketId = await redisConnection.get(id);
        
        if(!socketId){
            throw new NotFoundError(`User not connected for userId:${data.userId}`);
        }
        
        const socket = io.sockets.sockets.get(socketId);
        
        if (!socket) {
            throw new NotFoundError(`Socket connection not found for socketId:${socketId}`);
        }

        socket.emit(event, data);
        
        return res.status(StatusCodes.OK).send({
            success: true,
            message: "Successfully send submission response to user",
        });
        
    } catch (error: any) {
        logger.error(`Error while sending response to web socket client:${error.message}`);
        next(error);
    }
});

app.use(errorHandler);

export default server;