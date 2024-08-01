import { fetchProblemDetails } from "../api/fetchproblem";
import { codeExecutorFactory } from "../code_executor/factory";
import { submissionResponseQueue } from "../queue/submission_response";
import { SUBMISSION_RESPONSE_JOB } from "./constants";
import { createSubmissionResponse } from "./createSubmissionResponse";
import { evaluateExecutionResponse } from "./evaluateOutput";
import { parsedTestCases } from "./parsed_testcase";
import { publishJob } from "./publisher";
import { RequestJobPayload } from "./types";

export const submissionRequestJobHandler = (payload: RequestJobPayload) => {
    return new Promise<{status: string, message: string}>(async (resolve, reject)=>{
        try{
            const {problemId, language, code, submissionId} = payload;

            const problem = await fetchProblemDetails(problemId);

            const {input, output} = parsedTestCases(problem.testCases);

            const codeExecutor = codeExecutorFactory(language);
            const outputStream = await codeExecutor.execute(code, input);
            
            console.log(outputStream);

            const evaluationResponse = evaluateExecutionResponse(outputStream, output);
            const jobPayload = createSubmissionResponse(evaluationResponse, problem.testCases, submissionId);
            console.log(jobPayload);

            await publishJob({
                name: SUBMISSION_RESPONSE_JOB,
                queue: submissionResponseQueue,
                payload: jobPayload,
            })

            resolve({
                status: "Success",
                message: "Sucessfully handled job"
            })
        }catch(error){
            reject({
                status: "Failed",
                message: "Job failed"
            })
        }
    })
}