import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ServerConfig from "../config";
import { ApiError } from "@repo/error";

export default function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
			error: {
				...err,
				stack: ServerConfig.NODE_ENV == "production" ? "" : err.stack,
			},
		});
	}

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		success: false,
		message: "Something went wrong!",
		error: {
			name: "Internal_Server_Error",
			message: "Something went wrong",
			stack: ServerConfig.NODE_ENV == "production" ? "" : err.stack,
		},
	});
}
