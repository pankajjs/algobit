import { ConnectionOptions, Queue } from "bullmq"        

export type CreateQueue = {
    name: string,
    options: ConnectionOptions,
}

const createQueue = ({name, options}: CreateQueue) => {
    return new Queue(name, { connection: options})
}

export {
    createQueue
}