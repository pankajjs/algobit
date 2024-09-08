export type RequestJobPayload = {
    id: string,
    code: string,
    language: string,
    problemId: string,
}

export type ResponseJobPayload = {
    id: string;
    status: string;
    input?: string[] | string;
    output?: string[] | string;
    expectedOutput?: string | string[];
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
    testCases: number[];
    output: string[];
    expectedOutput: string[];
    status: string;
    constructor(testCases: number[], output: string[], expectedOutput: string[]){
        this.status = "WA";
        this.testCases = testCases;
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
    testCases: TestCases
    timeLimit: number,
    codestubs: {
        language: string,
        startSnippet: string,
        endSnippet: string, 
        userSnippet: string,
    }[]
}

export type ExecuteCodeParam = {
    image: string,
    commands: string[],
    timeLimit: number,
    languageTimeLimit: number,
}
