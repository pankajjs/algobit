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
            input: testCases[arg.testCases[0]].input,
            output: arg.output[0],
            expectedOutput: arg.expectedOutput[0],
        }
    }else {
        return {
            submissionId,
            status: arg.status,
            error: arg.error,
        }
    }
} 