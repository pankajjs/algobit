import { ErrorResponse, ResponseJobPayload, SuccessResponse, TestCases, WAResponse } from "./types";

export const createSubmissionResponse = (arg: WAResponse | SuccessResponse | ErrorResponse, testCases: TestCases, submissionId: string): ResponseJobPayload => {
    if(arg instanceof SuccessResponse){
        return {
            submissionId,
            status: arg.status,
            input: testCases.slice(0, 3).map(tc=>tc.input),
            output: testCases.slice(0, 3).map(tc=>tc.output)
        }
    }
    else if(arg instanceof WAResponse){
        return {
            submissionId,
            status: arg.status,
            input: testCases[arg.testCase == 0?arg.testCase:arg.testCase - 1].input,
            output: arg.output,
            expectedOutput: arg.expectedOutput,
        }
    }else {
        return {
            submissionId,
            status: arg.status,
            error: arg.error,
        }
    }
} 