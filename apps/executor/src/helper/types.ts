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

// export class ErrorResponse {
//     error: string | null;
//     status: string;
//     testCases: number[];
//     output: string[];
//     expectedOutput: string[];
//     constructor(status: string, error: string | null, testCases: number[], output: string[], expectedOutput: string[]){
//         this.status = this.status;
//         this.error = error;
//         this.testCases = testCases;
//         this.expectedOutput = expectedOutput;
//         this.output = output;
//     }
// }

// export class SuccessResponse { 
//     status: string;
//     constructor(status: string){
//         this.status = status;
//     }
// }

// export class WAResponse {
//     testCases: number[];
//     output: string[];
//     expectedOutput: string[];
//     status: string;
//     constructor(testCases: number[], output: string[], expectedOutput: string[]){
//         this.status = "WA";
//         this.testCases = testCases;
//         this.expectedOutput = expectedOutput;
//         this.output = output;
//     }
// }

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
