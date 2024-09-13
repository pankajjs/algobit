import { RUN_RESPONSE_JOB } from "./constants";
import { OutputStream, ResponseJobPayload, Status, TestCases, } from "./types";

export type CreateJobResponsePayload = {
    status: Status,
    id: string,
    outputStream: OutputStream,
    testCases: TestCases,
    responseJobName: string
}

export const createJobResponsePayload = ({
id, outputStream, status, testCases, responseJobName
}:CreateJobResponsePayload): ResponseJobPayload => {

    console.log(testCases)
    const executionOutputList = outputStream.stdout.trim().split("\n");

    if(status === Status.Success){
        const successTestCases = testCases.slice(0, 3)
        const input = successTestCases.map(tc=>tc.input);
        const output = successTestCases.map(tc=>tc.input);

        return {
            id: id, 
            error: null,
            input,
            output,
            expectedOutput: output,
            status,
        }
    }

    if(status === Status.WA){

        const expectedOutputList = testCases.map(tc=>tc.output);

        if(responseJobName === RUN_RESPONSE_JOB){
            return {
                error: null, 
                expectedOutput: expectedOutputList,
                id: id,
                input: testCases.map(tc=>tc.input),
                output: executionOutputList,
                status,
            }
        }

        let  WATestCase = -1;

        executionOutputList.forEach((v, i)=>{
            if(v != expectedOutputList[i]){
                WATestCase = i;
                return;
            }
        })

        const input = [testCases[WATestCase].input]
        return {
            error: null, 
            expectedOutput: [expectedOutputList[WATestCase]],
            id,
            input,
            output: [executionOutputList[WATestCase]],
            status,
        }
    }

    return {
        error: outputStream.stderr,
        id: id,
        status,
    }
} 