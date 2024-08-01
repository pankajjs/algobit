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

let user = "1"

io.on("connection", (socket)=>{
    console.log("user connected", user)

    redis.set(user, socket.id)
    redis.set(socket.id, user);

    socket.emit("joined", user);
    
    user = `${Number(user) + 1}`;

    socket.on("disconnect", async () => {
        const userId = await redis.get(socket.id);

        if (userId) {
            redis.del(userId);
            redis.del(socket.id);
        }
    });
})

app.post("/submission-response", async (req, res, next) => {
    try {
        const { submissionId, userId, status } = JSON.parse(req.body);
        
        const socketId = await redis.get(userId);
        
        if(!socketId){
            throw new ApiError(`User not connected for userId ${userId}`, StatusCodes.NOT_FOUND);
        }
        
        const socket = io.sockets.sockets.get(socketId);
        
        if (!socket) {
            throw new ApiError(`Socket connection not found for socketId ${socketId}`, StatusCodes.NOT_FOUND);
        }
        
        socket.emit("submission-response", { submissionId, userId, status });
        
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