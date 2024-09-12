import { OutputStream } from "../helper/types";

export interface CodeExecutor {
    execute(code: string, input: string, timeLimit: number):Promise<OutputStream>
}