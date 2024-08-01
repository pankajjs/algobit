import { ServerConfig } from "../config/server_config";
import { ResponseJobPayload } from "../helper/types";

export const sendSubmissionResponse = async (payload: ResponseJobPayload & {userId: string}) => {
    try{
        await fetch(`${ServerConfig.WS_SERVICE_URI}/submission-response`, {
            method: "POST",
            body: JSON.stringify(payload),
        })
    }catch(error){
        throw error;
    }
}