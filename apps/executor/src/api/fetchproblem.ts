import axios from "axios";
import { ServerConfig } from "../config/server_config";
import { Problem } from "../helper/types";

const fetchProblemDetails = (problemId: string) => {
    return new Promise<Problem>((resolve, reject)=>{
        axios.get(`${ServerConfig.ADMIN_SERVICE_URI}/api/v1/problems/${problemId}`)
        .then(res=>
            resolve(res.data.data))
        .catch(error=>{
            reject(error.message);
        })
    })  
}

export {
    fetchProblemDetails,
}