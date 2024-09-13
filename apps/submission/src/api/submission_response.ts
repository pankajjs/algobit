import { ServerConfig } from "../config/server_config";
import { ResponseJobPayload, SubmissionResponsePayload, Task } from "../helper/types";

export const sendResponse = async (payload: SubmissionResponsePayload | ResponseJobPayload, task:Task) => {
    try{
        await fetch(`${ServerConfig.WS_SERVICE_URI}/submission-response?task=${task}`, {
            method: "POST",
            body: JSON.stringify(payload),
        })
    }catch(error){
        throw error;
    }
}