export interface ExecutorResponse {
    submissionId: string,
    status: string,
    err?: string,
    output?: string,
    expectedOutput?: string
}

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

export type OutputStream = {
    stderr: string,
    stdout: string,
}


export type TestCases = {input: string, output: string}[]