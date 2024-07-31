import z from "zod";

export class ApiError extends Error {
    statusCode: number;
    details?: unknown;

    constructor(message: string, statusCode: number, details?: unknown){
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

export const CreateProblem = z.object({
    title: z.string().min(3, "Must be 3 characters long."),
    description: z.string().min(10, "Must be 10 characters long."),
    difficulty: z.string().toLowerCase().refine(value=> ["easy", "medium", "hard"].includes(value), "Must be any one of these [easy, hard, medium]"),
    editorial: z.string().optional(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string(),
    })),
}).strict();

export type CreateProblem = z.infer<typeof CreateProblem>;

export const UpdateProblem = CreateProblem.partial();
export type UpdateProblem = z.infer<typeof UpdateProblem>;