import { PYTHON_IMAGE, PYTHON_TIME_LIMIT } from "../helper/constants";
import { OutputStream } from "../helper/types";
import { CodeExecutor } from "./code_executor";
import { executeCodeInContainer } from "./executor";

export class PythonCodeExecutor implements CodeExecutor{
    async execute(code: string, input: string, timeLimit: number): Promise<OutputStream> {
        try{
            const sanitizedCode = code.replace(/'/g, `"`);
            const commands: string[] = ["/bin/sh", "-c", `echo '${input}' | python3 -c '${sanitizedCode}'`]
            
            return await executeCodeInContainer({
                image: PYTHON_IMAGE, 
                commands,
                languageTimeLimit: PYTHON_TIME_LIMIT, 
                timeLimit
            });
        }catch(error){
            throw error;
        }
    }
}

