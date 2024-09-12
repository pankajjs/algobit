import { TIME_LIMIT_SECOND } from "../helper/constants";
import { containerFactory } from "../helper/container_factory";
import { getOutputStream } from "../helper/decode_buffer";
import { pullImage } from "../helper/pull_image";
import { ExecuteCodeParam, OutputStream } from "../helper/types";


export const executeCodeInContainer = async ({image, commands, timeLimit, languageTimeLimit}: ExecuteCodeParam): Promise<OutputStream> => {
   try{
        const streamChunks: Buffer[] = [];
        
        await pullImage(image);

        const container = await containerFactory(image, commands);

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
   }catch(error){
    throw error;
   }
}