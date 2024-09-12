import { JAVA_IMAGE, JAVA_TIME_LIMIT } from "../helper/constants";
import { OutputStream } from "../helper/types";
import { CodeExecutor } from "./code_executor";
import { executeCodeInContainer } from "./executor";

export class JavaCodeExecutor implements CodeExecutor{
    async execute(code: string, input: string, timeLimit: number): Promise<OutputStream> {
        try{
            const sanitizedCode = code.replace(/'/g, `"`);
            const commands: string[] = ["/bin/sh", "-c", `echo '${sanitizedCode}' > Main.java && javac Main.java && echo '${input}' | java Main`]
            
            return await executeCodeInContainer({
                image: JAVA_IMAGE, 
                commands,
                languageTimeLimit: JAVA_TIME_LIMIT, 
                timeLimit
            });
        }catch(error){
            throw error;
        }
    }
}

