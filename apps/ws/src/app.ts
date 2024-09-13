import express, { Request } from "express";
import { createServer } from "http";
import StatusCodes from "http-status-codes";
import { errorHandler } from "./helper/middleware";
import { ApiError } from "./helper/types";
import { redis } from "./helper/redis";
import { Server } from "socket.io";

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
        redis.set(userId, socket.id)
        redis.set(socket.id, userId);
        console.log("User joined", userId, socket.id)
    })
  
    socket.on("disconnect", async () => {
        const userId = await redis.get(socket.id);
        if (userId) {
            redis.del(userId);
            redis.del(socket.id);
        }
        console.log("User disconnected. userId: ", userId, ", socketId: ", socket.id)
    });
})

app.post("/submission-response", async (req:Request, res, next) => {
    try {
        const task = req.query.task;
        const data = JSON.parse(req.body);

        
        let id:string = data.userId;
        let event:string = "submission-response";
        console.log(id, event)
        
        if(task === "Run"){
            id = data.id;
            event = "run-response";
        }

        console.log(id, event)
        
        const socketId = await redis.get(id);
        
        if(!socketId){
            throw new ApiError(`User not connected for userId ${data.userId}`, StatusCodes.NOT_FOUND);
        }
        
        const socket = io.sockets.sockets.get(socketId);
        
        if (!socket) {
            throw new ApiError(`Socket connection not found for socketId ${socketId}`, StatusCodes.NOT_FOUND);
        }

        socket.emit(event, data);
        
        return res.status(StatusCodes.CREATED).send({
            success: true,
            message: "Successfully send submission response to user",
        });
        
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

export {
    server,
}