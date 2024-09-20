import { RunResponseJobPayload, SubmissionResponsePayload, Task } from "@repo/types";
import ServerConfig from "../config";
import axios from "axios";

async function sendResponse(payload: SubmissionResponsePayload |  RunResponseJobPayload, task: Task) {
    try{
        await axios.post(`${ServerConfig.WS_SERVICE_URI}/response?task=${task}`, payload);
    }catch(error: any){
        logger.error(`Error while sending response to websocket service: ${error.message}`);
    }
}

export default sendResponse;