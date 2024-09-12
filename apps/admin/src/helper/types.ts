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
    title: z.string().min(3, "Must be atleast 3 characters long."),
    description: z.string().min(10, "Must be 10 characters long."),
    difficulty: z.string().toLowerCase().refine(value=> ["easy", "medium", "hard"].includes(value), "Must be any one of these [easy, hard, medium]"),
    editorial: z.string().optional(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string(),
    }), {message: "Must have atleast 1 testcase"}),
    codeStubs: z.array(z.object({
        language: z.string().min(1, "Must be atleast 1 character long"),
        userSnippet: z.string().min(1, "Must be atleast 1 character long"),
        startSnippet: z.string().min(1, "Must be atleast 1 character long"),
        endSnippet: z.string().min(1, "Must be atleast 1 character long"),
    })),
    timeLimit: z.coerce.number().gt(0, "Must be greater than 0."),
}).strict();

export type CreateProblem = z.infer<typeof CreateProblem>;

export const UpdateProblem = CreateProblem.partial();
export type UpdateProblem = z.infer<typeof UpdateProblem>;