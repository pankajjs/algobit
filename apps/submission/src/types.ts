import z from "zod";

export type JobPayload = {
    code: string,
    language: string,
    problemId: string,
    submissionId: string,
}

export class ApiError extends Error {
    statusCode: number;
    details?: unknown;

    constructor(message: string, statusCode: number, details?: unknown){
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

export const Submission = z.object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
}).strict();

export type Submission = z.infer<typeof Submission>; 