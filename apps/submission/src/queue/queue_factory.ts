import { CreateQueue, Queue } from "@repo/types";

export default function createQueue({name, options}: CreateQueue) {
    return new Queue(name, { connection: options})
}
