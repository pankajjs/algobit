import { ExecuteCodeParam, OutputStream } from "@repo/types";
import { TIME_LIMIT_SECOND } from "../constants";
import { pullDockerImage, createDockerContainer, getOutputStream } from "../helper";

export default async function executeCodeInDockerContainer({image, commands, timeLimit, languageTimeLimit}: ExecuteCodeParam): Promise<OutputStream> {
   try{
        const streamChunks: Buffer[] = [];
        
        await pullDockerImage(image);

        const container = await createDockerContainer(image, commands);

        await container.start();

        const  logStream = await container.logs({
            follow: true,
            stderr: true,
            stdout: true,
        })

        return new Promise((resolve, reject)=>{
            
            const timeLimitId = setTimeout(async ()=>{
                resolve({
                    stderr: "TLE",
                    stdout: ""
                })
                await container.kill();
            }, timeLimit * languageTimeLimit * TIME_LIMIT_SECOND);
            
            logStream.on("data", (chunk) => {
                streamChunks.push(chunk);
            })

            logStream.on("end", async () =>{
                clearTimeout(timeLimitId);
                const bufferStream = Buffer.concat(streamChunks);
                const outputStream = getOutputStream(bufferStream);
                resolve(outputStream);
                await container.remove();
            })

            logStream.on("error", async (error) => {
                await container.remove();
                reject(new Error(`Stream error: ${error.message}`));
            });

        })
   }catch(error: any){
        logger.error(`Error while executing code in docker container: ${error.message}`);
        throw error;
   }
}