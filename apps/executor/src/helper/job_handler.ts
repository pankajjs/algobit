import { fetchProblemDetails } from "../api/fetchproblem";
import { codeExecutorFactory } from "../code_executor/factory";
import { responseQueue } from "../queue/response_queue";
import { RUN_REQUEST_JOB, RUN_RESPONSE_JOB, SUBMISSION_RESPONSE_JOB } from "./constants";
import { createResponse } from "./createResponse";
import { evaluateExecutionResponse } from "./evaluateOutput";
import { parsedTestCases } from "./parsed_testcase";
import { publishJob } from "./publisher";
import { RequestJobPayload } from "./types";

export const requestQueueJobHandler = (requestJobName: string, payload: RequestJobPayload) => {
    return new Promise<{status: string, message: string, error?: string}>(async (resolve, reject)=>{
        try{

            const {problemId, language, code} = payload;

            let problem;
            let responseJobName: string;

            if(requestJobName === RUN_REQUEST_JOB){
                responseJobName = RUN_RESPONSE_JOB;
                problem = await fetchProblemDetails(problemId, true);
            }else{
                responseJobName = SUBMISSION_RESPONSE_JOB;
                problem = await fetchProblemDetails(problemId, false);
            }

            const {input, output} = parsedTestCases(problem.testCases);

            const codeExecutor = codeExecutorFactory(language);

            const codestub = problem.codestubs.find((codestub)=>codestub.language.toLowerCase() == language.toLowerCase());

            if(!codestub){
                reject({
                    status: "Failed",
                    message: "Job failed",
                    error: "Codestub not found",
                })
                return;
            }

            const updatedCode = codestub.startSnippet + "\n\n" + code + "\n\n" + codestub.endSnippet;
            console.log(updatedCode)
            const outputStream = await codeExecutor.execute(updatedCode, input, problem.timeLimit);
            
            console.log(outputStream);

            const evaluationResponse = evaluateExecutionResponse(outputStream, output);

            const jobPayload = createResponse(evaluationResponse, problem.testCases, payload.id);
           
            console.log(jobPayload);

            await publishJob({
                name: responseJobName ,
                queue: responseQueue,
                payload: jobPayload,
            })

            resolve({
                status: "Success",
                message: "Sucessfully handled job",
            })
        }catch(error){
            reject({
                status: "Failed",
                message: "Job failed",
                error: error,
            })
        }
    })
}