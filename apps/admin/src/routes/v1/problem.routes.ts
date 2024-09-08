import { NextFunction, Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import { db } from "../../helper/db";
import { ApiError, CreateProblem, UpdateProblem } from "../../helper/types";
import { sanitizedMarkdown } from "../../helper/sanitize_markdown";

const problemRouter = Router();

problemRouter.get("/ping", (_: Request, res: Response)=>{
    return res.status(StatusCodes.OK).send("[ProblemController]: pong");
})

// Used by Client
problemRouter.get("/:name([a-zA-Z]+)", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const name = req.params.name;

        const problem = await db.problem.findFirst({
            where: {
                title: name,
            }
        })

        if(!problem){
            throw new ApiError(`Problem not found with title=${name}`, StatusCodes.NOT_FOUND);
        }

        problem.testCases = problem.testCases.slice(0, 3);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched a problem",
            data: {
                ...problem,
            },
            error: {}
        })

    }catch(error: any){
        next(error);
    }
})

// Used by Internal services
problemRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;

        const problem = await db.problem.findFirst({
            where: {
                id: id,
            },
            select:{
                timeLimit: true,
                codestubs: true,
                testCases: true,
            }
        })

        if(!problem){
            throw new ApiError(`Problem not found with id=${id}`, StatusCodes.NOT_FOUND);
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched a problem",
            data: {
                ...problem,
            },
            error: {}
        })

    }catch(error: any){
        next(error);
    }
})

problemRouter.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try{
        const problems = await db.problem.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                difficulty: true,
                title: true,
            }
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched all problems",
            data: problems,
            error: {}
        })
    }catch(error: any){
        next(error);
    }
})

problemRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        const id = req.params.id;

        const problem = await db.problem.findFirst({
            where: {
                id: id,
            }
        });

        if(!problem){
            throw new ApiError(`Problem not found with id=${id}`, StatusCodes.NOT_FOUND);
        }

        await db.problem.delete({
            where: {
                id: id,
            }
        })

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully delete a problem",
            data: {},
            error: {}
        })
    }catch(error: any){
        next(error);
    }
})

problemRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const parsedSchema = await CreateProblem.safeParseAsync(req.body);

        if(!parsedSchema.success){
            throw new ApiError("Invalid request body", StatusCodes.BAD_REQUEST,
                parsedSchema.error.issues.map(issue=>({
                    message: issue.message,
                    path: issue.path,
                }))
            )
        }
        
        parsedSchema.data.description = sanitizedMarkdown(parsedSchema.data.description)

        const problem = await db.problem.create({
            data: parsedSchema.data,
        })

        return res.status(StatusCodes.CREATED).json({
            success: true, 
            message: "Successfully created new problem",
            data: problem,
            error: {}
        })
    }catch(error: any){
        next(error);
    }
})

problemRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const parsedSchema = await UpdateProblem.safeParseAsync(req.body);

        if(!parsedSchema.success){
            throw new ApiError("Invalid request body", StatusCodes.BAD_REQUEST, 
                parsedSchema.error.issues.map(issue=>({ messgae: issue.message, path: issue.path}))
            );
        }

        const existingProblem = await db.problem.findFirst({
            where: {
                id: id,
            }
        });

        if(!existingProblem){
            throw new ApiError(`Problem not found with id=${id}`, StatusCodes.NOT_FOUND);
        }

        if(parsedSchema.data.description){
            parsedSchema.data.description = sanitizedMarkdown(parsedSchema.data.description);
        }

        const problem = await db.problem.update({
            where: {
                id: existingProblem.id,
            },
            data: parsedSchema.data,
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully updated a problem",
            data: problem,
            error: {}
        })
    }catch(error: any){
        next(error);
    }
})

export {
    problemRouter,
}