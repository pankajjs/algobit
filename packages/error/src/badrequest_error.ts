import { StatusCodes } from "http-status-codes";
import ApiError from "./api_error";

export default class BadRequestError extends ApiError {
	details?: unknown;

	constructor(message: string, details?: unknown) {
		super(message, StatusCodes.BAD_REQUEST);
		this.details = details;
		this.name = this.constructor.name;
	}
}
