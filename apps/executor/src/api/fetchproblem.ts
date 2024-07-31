import axios from "axios";
import { ServerConfig } from "../config/server_config";
import { TestCases } from "../helper/types";

const fetchProblemTestCase = (problemId: string) => {
    return new Promise<TestCases>((resolve, reject)=>{
        axios.get(`${ServerConfig.Problem_Admin_Service}/api/v1/problems/${problemId}`)
        .then(res=>
            resolve(res.data.data.testCases))
        .catch(error=>{
            reject(error.message);
        })
    })  
}

export {
    fetchProblemTestCase,
}