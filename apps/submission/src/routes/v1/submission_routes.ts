import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ApiError, Submission } from "../../types";
import { StatusCodes } from "http-status-codes";
import { db } from "../../db";
import { publishJob } from "../../publisher/publisher";
import { SUBMISSION_JOB_NAME } from "../../constants";
import { submissionQueue } from "../../queue/submission_queue";

async function SubmissionRoutes(fastify: FastifyInstance, _option: FastifyPluginOptions){
    fastify.get("/ping", async function (_req, res){
        return res.send("[SubmissinController]: pong");
    });

    fastify.post("/", async function createSubmision(req, res){
        try{
            
            const parsedSchema = await Submission.safeParseAsync(req.body);

            if(!parsedSchema.success){
                throw new ApiError("Invalid request body", StatusCodes.BAD_REQUEST,
                    parsedSchema.error.issues.map(issue=>({
                        message: issue.message,
                        path: issue.path,
                    }))
                )
            }

            // Todo: check user exists
            // Todo: check problem exists

            const submission = await db.submission.create({
                data: {
                    code: parsedSchema.data.code,
                    language: parsedSchema.data.language,
                    userId: parsedSchema.data.userId,
                    problemId: parsedSchema.data.problemId,
                }
            });

            await publishJob({
                name: SUBMISSION_JOB_NAME,
                payload: {
                    submissionId: submission.id,
                    code: submission.code,
                    language: submission.language, 
                    problemId: submission.problemId,
                },
                queue: submissionQueue,
            })
            
            return res.status(StatusCodes.CREATED).send({
                success: true,
                message: "Successfully created a submission",
                data: submission,
                error: {}
            });
        }catch(error: any){
            fastify.log.error("Error in createSubmission", error.message);
            throw error;
        }
    })
}

export {
    SubmissionRoutes
}