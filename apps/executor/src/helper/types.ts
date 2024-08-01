export type RequestJobPayload = {
    code: string,
    language: string,
    problemId: string,
    submissionId: string
}

export type ResponseJobPayload = {
    submissionId: string;
    status: string;
    input?: string[] | string;
    output?: string[] | string;
    expectedOutput?: string;
    error?: string;
}

export class ErrorResponse {
    error: string;
    status: string;
    constructor(error: string, status: string){
        this.error = error;
        this.status = status;
    }
}

export class SuccessResponse { 
    status: string;
    constructor(status: string){
        this.status = status;
    }
}

export class WAResponse {
    testCase: number;
    output: string;
    expectedOutput: string;
    status: string;
    constructor(testCase: number, output: string, expectedOutput: string){
        this.status = "WA";
        this.testCase = testCase;
        this.expectedOutput = expectedOutput;
        this.output = output;
    }
}

export type OutputStream = {
    stderr: string,
    stdout: string,
}


export type TestCases = {input: string, output: string}[]

export type Problem = {
    id: string,
    title: string,
    description: string,
    editorial: string,
    testCases: TestCases
    difficulty: string,
    createdAt: Date,
    updatedAt: Date,
}