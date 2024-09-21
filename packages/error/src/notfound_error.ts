import { StatusCodes } from "http-status-codes";
import ApiError from "./api_error";

export default class NotFoundError extends ApiError {
	details?: unknown;

	constructor(message: string, details?: unknown) {
		super(message, StatusCodes.NOT_FOUND);
		this.details = details;
		this.name = this.constructor.name;
	}
}
