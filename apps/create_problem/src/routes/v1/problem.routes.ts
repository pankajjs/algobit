import { NextFunction, Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import { db } from "../../db";
import { ApiError } from "../../types";

const problemRouter = Router();

problemRouter.get("/ping", (_: Request, res: Response)=>{
    return res.status(StatusCodes.OK).send("[ProblemController]: pong");
})

problemRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;

        const problem = await db.problem.findFirst({
            where: {
                id: id,
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
        const problems = await db.problem.findMany();

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

export {
    problemRouter,
}