import { ErrorResponse, OutputStream, SuccessResponse, WAResponse } from "./types";

export const evaluateExecutionResponse = (outputStream: OutputStream, expectedOutput: string): WAResponse | SuccessResponse | ErrorResponse => {
    if(outputStream.stdout !=  ""){
        const executionOutput = outputStream.stdout.trim();

        if(executionOutput === expectedOutput){
            return new SuccessResponse("Success");
        }
        
        const executionOutputList = executionOutput.split("\n");
        const expectedOutputList = expectedOutput.split("\n");
        
        const testCasesResponse: number[] = [];
        const expectedOutputResponse: string[] = [];
        const executionOutputResponse: string[] = [];

        executionOutputList.forEach((v, i)=>{
            if(v != expectedOutputList[i]){
                testCasesResponse.push(i);
                expectedOutputResponse.push(expectedOutputList[i])
                executionOutputResponse.push(v);
            }
        })

        return new WAResponse(testCasesResponse, executionOutputResponse, expectedOutputResponse);
    }
    
    return new ErrorResponse(outputStream.stderr, "Error");
}
