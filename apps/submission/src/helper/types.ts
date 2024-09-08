import z from "zod";

export type RequestJobPayload = {
    id: string,
    code: string,
    language: string,
    problemId: string,
}

export type ResponseJobPayload = {
    id: string,
    status: string;
    input?: string[] | string;
    output?: string[] | string;
    expectedOutput?: string;
    error?: string;
}

export type SubmissionResponsePayload = {
    code: string,
    createdAt: Date,
    language: string,
    problemId: string,
    userId: string
} & ResponseJobPayload;

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