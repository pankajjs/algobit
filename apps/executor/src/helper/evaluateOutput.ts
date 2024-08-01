import { ErrorResponse, OutputStream, SuccessResponse, WAResponse } from "./types";

export const evaluateExecutionResponse = (outputStream: OutputStream, expectedOutput: string): WAResponse | SuccessResponse | ErrorResponse => {
    if(outputStream.stdout !=  ""){
        const executionOutput = outputStream.stdout.trim();

        if(executionOutput === expectedOutput){
            return new SuccessResponse("Success");
        }
    
        for(let i = 0; expectedOutput.length; i++){
            if(executionOutput[i] != expectedOutput[i]){
                return new WAResponse(i, executionOutput[i], expectedOutput[i])
            }
        }
    }
    
    return new ErrorResponse(outputStream.stderr, "Error");
}
