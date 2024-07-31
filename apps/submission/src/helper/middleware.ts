import { FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "./types";
import { StatusCodes } from "http-status-codes";
import { ServerConfig } from "../config/server_config";

export const errorHandler = (error: Error, req: FastifyRequest, res: FastifyReply) => {
    if(error instanceof ApiError){
        return res.status(error.statusCode)
            .send({
                success: false,
                message: error.message,
                data: {},
                error: {
                ...error,
                stack: ServerConfig.NODE_ENV=="production"?"": error.stack
                }
            });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            success: false, 
            message: "Something went wrong!", 
            data: {},
            error: {
                name: "Internal_Server_Error",
                message: "Something went wrong",
                stack: ServerConfig.NODE_ENV=="production"?"": error.stack
            }
        });
}