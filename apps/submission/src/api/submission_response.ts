import { ServerConfig } from "../config/server_config";
import { ResponseJobPayload, SubmissionResponsePayload } from "../helper/types";

export const sendResponse = async (payload: SubmissionResponsePayload | ResponseJobPayload, run:boolean) => {
    try{
        await fetch(`${ServerConfig.WS_SERVICE_URI}/submission-response?run=${run}`, {
            method: "POST",
            body: JSON.stringify(payload),
        })
    }catch(error){
        throw error;
    }
}