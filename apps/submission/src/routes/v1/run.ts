import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { StatusCodes } from "http-status-codes";
import { publishJob } from "../../helper";
import { RUN_REQUEST_JOB } from "../../constants";
import { requestQueue } from "../../queue";

export default async function RunRoutes(fastify: FastifyInstance, _option: FastifyPluginOptions){
    fastify.post("/", async (req, res)=>{
        try{
            const body:any = req.body;
            console.log(body);

            await publishJob({
                name: RUN_REQUEST_JOB,
                payload: {
                    code: body.code,
                    problemId: body.problemId,
                    id: body.userId,
                    language: body.language,
                },
                queue: requestQueue,
            })

            return res.status(StatusCodes.OK).send({
                success: true,
                message: "Successfully received a run request",
                data: body,
            })

        }catch(error: any){
            logger.error(`Error while running code: ${error.message}`);
            throw error;
        }
    })
}
