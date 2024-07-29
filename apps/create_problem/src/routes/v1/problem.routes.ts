import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";

const problemRouter = Router();

problemRouter.get("/ping", (_: Request, res: Response)=>{
    return res.status(StatusCodes.OK).send("[ProblemController]: pong");
})

export {
    problemRouter,
}