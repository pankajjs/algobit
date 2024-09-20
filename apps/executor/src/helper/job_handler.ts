import { Job, RunRequestJobPayload, SubmissionRequestJobPayload } from "@repo/types";
import { fetchProblemDetails } from "../api";
import ServerConfig from "../config";
import parsedTestCases from "./parsed_testcase";
import { codeExecutorFactory } from "../code_executor";
import evaluateExecutionOutput from "./evaluate_output";
import createJobResponsePayload from "./create_job_response";
import { RUN_RESPONSE_JOB, SUBMISSION_RESPONSE_JOB } from "../constants";
import publishJob from "./publisher";
import { responseQueue } from "../queue";

export default async function jobHandler(job:Job) {
    try{

        const payload = job.data as RunRequestJobPayload | SubmissionRequestJobPayload;

        const {problemId, language, code, id} = payload;

        console.log(payload);

        const problem = await fetchProblemDetails(`${ServerConfig.ADMIN_SERVICE_URI}/api/v1/problems/${problemId}`);
        
        if(!problem) {
            return;
        };

        let responseJobName: string = SUBMISSION_RESPONSE_JOB;

        if(job.name !== responseJobName){
            responseJobName = RUN_RESPONSE_JOB;
            problem.testCases = problem.testCases.slice(0, 3);
        }

        const {input, output} = parsedTestCases(problem.testCases);

        const codeExecutor = codeExecutorFactory(language);

        const codestub = problem.codestubs.find((codestub)=>codestub.language.toLowerCase() == language.toLowerCase());

        if(!codestub){
            return;
        }

        const updatedCode = codestub.startSnippet + "\n\n" + code + "\n\n" + codestub.endSnippet;
        console.log(updatedCode)
        const outputStream = await codeExecutor.execute(updatedCode, input, problem.timeLimit);
        
        console.log(outputStream);

        const evaluationStatus = evaluateExecutionOutput(outputStream, output);

        const jobPayload = createJobResponsePayload({
            id, testCases: problem.testCases, outputStream, status: evaluationStatus,
            jobName: responseJobName,
        });

        console.log(jobPayload);

        await publishJob({
            name: responseJobName ,
            queue: responseQueue,
            payload: jobPayload,
        })
        
        logger.info(`Successfully handled submission job`);
    }catch(error: any){
        logger.error(`Error while handling submission job: ${error.message}`);
        throw error;
    }
}