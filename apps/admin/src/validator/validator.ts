import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "@repo/error"

export default class Validator {
    static validateRequestBody(schema: ZodSchema) {
        return async function(req: Request, _res: Response, next: NextFunction){
            try{
                const body = req.body;

                const parsedSchema = await schema.safeParseAsync(body);

                if(!parsedSchema.success){
                    throw new BadRequestError("Invalid request body",
                        parsedSchema.error.issues.map(issue=>({
                            message: issue.message,
                            path: issue.path,
                        }))
                    )
                }

                req.body = parsedSchema.data;
                next();
            }catch(error:any){
                logger.error(`Error while validating request body: ${error.message}`);
                next(error);
            }
        }
    }
}