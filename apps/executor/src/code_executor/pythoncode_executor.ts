import { CodeExecutor, OutputStream } from "@repo/types";
import executeCodeInDockerContainer from "./executor";
import { PYTHON_IMAGE, PYTHON_TIME_LIMIT } from "../constants";

export default class PythonCodeExecutor implements CodeExecutor{
    async execute(code: string, input: string, timeLimit: number): Promise<OutputStream> {
        try{
            const sanitizedCode = code.replace(/'/g, `"`);
            const commands: string[] = ["/bin/sh", "-c", `echo '${input}' | python3 -c '${sanitizedCode}'`]
            
            return await executeCodeInDockerContainer({
                image: PYTHON_IMAGE, 
                commands,
                languageTimeLimit: PYTHON_TIME_LIMIT, 
                timeLimit
            });
        }catch(error: any){
            logger.error(`Error while executing python code: ${code}`);
            throw error;
        }
    }
}

