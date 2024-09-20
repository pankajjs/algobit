import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import ServerConfig from "../config";
import { ApiError } from "@repo/error";

export default function errorHandler(error: Error, _req: FastifyRequest, res: FastifyReply) {
    if(error instanceof ApiError){
        return res.status(error.statusCode)
            .send({
                success: false,
                message: error.message,
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
            error: {
                name: "Internal_Server_Error",
                message: "Something went wrong",
                stack: ServerConfig.NODE_ENV=="production"?"": error.stack
            }
        });
}