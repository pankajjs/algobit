import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ApiError, Submission } from "../../helper/types";
import { StatusCodes } from "http-status-codes";
import { db } from "../../helper/db";
import { publishJob } from "../../helper/publisher";
import { RUN_REQUEST_JOB, SUBMISSION_REQUEST_JOB } from "../../helper/constants";
import { requestQueue } from "../../queue/submission_request";

async function SubmissionRoutes(fastify: FastifyInstance, _option: FastifyPluginOptions){
    fastify.get("/ping", async function (_req, res){
        return res.send("[SubmissinController]: pong");
    });

    fastify.post("/run", async function run(req, res){
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

            await publishJob({
                name: RUN_REQUEST_JOB,
                payload: {
                  code: parsedSchema.data.code,
                  language: parsedSchema.data.language,
                  problemId: parsedSchema.data.problemId,
                  id: parsedSchema.data.userId,
                },
                queue: requestQueue,
            })
            
            return res.status(StatusCodes.CREATED).send({
                success: true,
                message: "Successfully submitted a request",
                data:  parsedSchema.data,
                error: {}
            });
        }catch(error: any){
            fastify.log.error("Error in run", error.message);
            throw error;
        }    
    })

    fastify.get("", async function getUserSubmission(request, reply) {
        try{
            const { userId } = request.query as {userId: string};
            
            const submissions = await db.submission.findMany({
                where: {
                    userId: userId,
                    status: {
                        not: "Pending"
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })

            return reply.status(StatusCodes.OK).send({
                success: true,
                message: "Successfully fetched all submission of user",
                data: submissions,
                error: {}
            });;

        }catch(error: any){
            fastify.log.error("Error in getUserSubmission", error.message);
            throw error;
        }
    })

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
                name: SUBMISSION_REQUEST_JOB,
                payload: {
                    id: submission.id,
                    code: submission.code,
                    language: submission.language, 
                    problemId: submission.problemId,
                },
                queue: requestQueue,
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