import { Queue } from "bullmq";
import { JobPayload } from "./types";

export type PublishJobParams = {
    name: string,
    payload: JobPayload,
    priority?: number,
    queue: Queue
}

const publishJob = async (params: PublishJobParams) => {
    try{
        await params.queue.add(
            params.name,
            params.payload, 
            { priority: params.priority }
        );
    }catch(error){
        throw error;
    }
}

export {
    publishJob,
}