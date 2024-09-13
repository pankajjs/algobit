import { Status, OutputStream } from "./types";

export const evaluateExecutionOutput = (outputStream: OutputStream, expectedOutput: string): Status => {
    if(outputStream.stdout !=  ""){
        if(outputStream.stdout.trim() === expectedOutput){
            return Status.Success;
        }
        return Status.WA;
    }
    
    return Status.Error
}
