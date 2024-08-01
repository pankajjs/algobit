import { NextFunction, Request, Response } from "express";
import { ApiError } from "./types";
import { StatusCodes } from "http-status-codes";
import { ServerConfig } from "../config/server_config";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if(err instanceof ApiError){
        return res.status(err.statusCode)
            .json({
                success: false,
                message: err.message,
                data: {},
                error: {
                ...err,
                stack: ServerConfig.NODE_ENV=="production"?"": err.stack
                }
            });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false, 
            message: "Something went wrong!", 
            data: {},
            error: {
                name: "Internal_Server_Error",
                message: "Something went wrong",
                stack: ServerConfig.NODE_ENV=="production"?"": err.stack
            }
        });
}