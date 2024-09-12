import { docker } from "./docker";

const pullImage = (image: string) => {
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
    }catch(error){
        throw error;
    }
}

export {
    pullImage,
}