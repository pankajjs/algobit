import { PYTHON_IMAGE } from "../helper/constants";
import { getOutputStream } from "../helper/decode_buffer";
import { pullImage } from "../helper/pull_image";
import { ExecutorResponse, JobPayload } from "../helper/types";
import { CodeExecutor } from "./code_executor";
import { fetchProblemTestCase } from "../api/fetchproblem";
import { parsedTestCases } from "../helper/parsed_testcase";
import { containerFactory } from "../helper/container_factory";

export class PythonCodeExecutor implements CodeExecutor{
    async execute(payload: JobPayload): Promise<ExecutorResponse> {
        try{
            const {problemId, code, submissionId} = payload;
            
            const testCases = await fetchProblemTestCase(problemId);
            
            const {input, output} = parsedTestCases(testCases);

            const streamChunks: Buffer[] = [];
            const sanitizedCode = code.replace(/'/g, `"`);
            const command = `echo '${input}' | python3 -c '${sanitizedCode}'`;

            await pullImage(PYTHON_IMAGE);
    
            const container = await containerFactory(PYTHON_IMAGE, ["/bin/sh", "-c", command]);
    
            await container.start();
    
            const  logStream = await container.logs({
                follow: true,
                stderr: true,
                stdout: true,
            })
    
            return new Promise((resolve, reject)=>{
                
                logStream.on("data", (chunk) => {
                    streamChunks.push(chunk);
                })

                logStream.on("end", async () =>{
                    
                    const bufferStream = Buffer.concat(streamChunks);
                    const outputStream = getOutputStream(bufferStream);
                    
                    if(outputStream.stderr != ""){
                        resolve({
                            submissionId,
                            status: "Error",
                            err: outputStream.stderr,
                        })
                    }
                    else{
                        if(output == outputStream.stdout){
                            resolve({
                                status: "Success",
                                submissionId,
                            })
                        }else{
                            resolve({
                                status: "WA",
                                submissionId,
                            })
                        }
                    }                    
                    await container.remove();
                })

                logStream.on("error", async (error) => {
                    await container.remove();
                    reject(new Error(`Stream error: ${error.message}`));
                });
    
            })
        }catch(error){
            throw error;
        }
    }
}

