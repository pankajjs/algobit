import { docker } from "./docker";

const containerFactory = async (image: string, cmd: string[]) => {
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
        
    }catch(error){
        throw error;
    }
}

export {
    containerFactory
}