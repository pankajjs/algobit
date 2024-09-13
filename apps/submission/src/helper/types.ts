import z from "zod";

export type RequestJobPayload = {
    id: string,
    code: string,
    language: string,
    problemId: string,
}

export type ResponseJobPayload = {
    id: string;
    status: Status;
    error: string | null;
    output?: string[];
    expectedOutput?: string[];
    input?: string[];
};


export enum Status {
    Success= "Success",
    WA="WA",
    Error="Error"
}

export type SubmissionResponsePayload = {
    code: string,
    createdAt: Date,
    language: string,
    problemId: string,
    userId: string
} & ResponseJobPayload;

 export type Task =  "Run"|"Submit"

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