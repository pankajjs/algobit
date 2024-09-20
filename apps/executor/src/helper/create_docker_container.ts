import docker from "./docker";

export default async function createDockerContainer (image: string, cmd: string[]){
    try{ 
        return await docker.createContainer({
            Image: image,
            Cmd: cmd,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            OpenStdin: true,
        })
        
    }catch(error: any){
        logger.error(`Error while creating docker container: ${error.messgae}`);
        throw error;
    }
}