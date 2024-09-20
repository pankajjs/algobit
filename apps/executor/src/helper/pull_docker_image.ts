import docker from "./docker";

export default function pullDockerImage(image: string) {
    try{ 
        return new Promise((resolve, reject)=>{
            docker.pull(image, (err: Error, stream: NodeJS.ReadableStream)=>{
   
                if (err) {
                    throw err;
                }

                docker.modem.followProgress(stream, (err, response)=>{
                    if (err) reject(err);
                    resolve(response.pop().status);
                })
            })
        });
    }catch(error: any){
        logger.error(`Error while pulling ${image} docker image: ${error.message}`);
        throw error;
    }
}