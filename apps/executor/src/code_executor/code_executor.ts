import { ExecutorResponse, JobPayload } from "../helper/types";

export interface CodeExecutor {
    execute(payload: JobPayload):Promise<ExecutorResponse>
}