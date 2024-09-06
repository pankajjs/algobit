import express from "express";
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
        console.log("userId: ", userId);

        redis.set(userId, socket.id)
        redis.set(socket.id, userId);
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

app.post("/submission-response", async (req, res, next) => {
    try {
        const data = JSON.parse(req.body);
        
        const socketId = await redis.get(data.userId);
        
        if(!socketId){
            throw new ApiError(`User not connected for userId ${data.userId}`, StatusCodes.NOT_FOUND);
        }
        
        const socket = io.sockets.sockets.get(socketId);
        
        if (!socket) {
            throw new ApiError(`Socket connection not found for socketId ${socketId}`, StatusCodes.NOT_FOUND);
        }
        console.log(data);
        socket.emit("submission-response", data);
        
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