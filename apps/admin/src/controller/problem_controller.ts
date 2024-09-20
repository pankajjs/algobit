import { IProblemService } from "@repo/types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default class ProblemController {
    private problemService: IProblemService;

    constructor(problemService: IProblemService){
        this.problemService = problemService;
    }

    async deleteProblem(req: Request, res: Response, next: NextFunction){
        try{
            const id = req.params.id;
            await this.problemService.deleteById(id);

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully deleted a problem",
            })
        }catch(error: any){
            logger.error(`Error while deleting a problem: ${error.message}`);
            next(error);
        }
    }

    async updateProblem(req: Request, res: Response, next: NextFunction){
        try{
            const id = req.params.id;
            const data = req.body;

            const problem = await this.problemService.updateById(id, data);
            
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully updated a problem",
                problem,
            })

        }catch(error: any){
            logger.error(`Error while updating a problem: ${error.message}`);
            next(error);
        }
    }

    async createProblem(req: Request, res: Response, next: NextFunction) {
        try{
            const data = req.body;

            const problem = await this.problemService.create(data);

            return res.status(StatusCodes.CREATED).json({
                success: true, 
                message: "Successfully created new problem",
                problem,
            })
        }catch(error:any){
            logger.error(`Error while creating a problem: ${error.message}`);
            next(error);
        }
    }

    async getAllProblem(_: Request, res: Response, next: NextFunction) {
        try{
            const problems = await this.problemService.findAll();

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully fetched all problem",
                problems,
            })

        }catch(error: any){
            logger.error(`Error while fetching all problems: ${error.message}`);
            next(error);
        }
    }

    async getProblemById(req: Request, res: Response, next: NextFunction) {
        try{
            const id = req.params.id;
            
            const problem = await this.problemService.findById(id);

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully fetched a problem",
                problem,
            })
        }catch(error: any){
            logger.error(`Error while fetching problem by id: ${error.message}`);
            next(error);
        }
    }

    async getProblemByName(req: Request, res: Response, next: NextFunction) {
        try{
            const name = req.params.name;

            const problem = await this.problemService.findByTitle(name);

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Successfully fetched a problem",
                problem,
            })
    
        }catch(error: any){
            logger.error(`Error while fetching problem by name: ${error.message}`);
            next(error);
        }
    }
}