import { Router } from "express";
import { ProblemDao } from "../../dao";
import ProblemController from "../../controller/problem_controller";
import {
	CreateProblem,
	type IProblemDao,
	type IProblemService,
	UpdateProblem,
} from "@repo/types";
import { ProblemService } from "../../service";
import { Validator } from "../../validator";

const problemRouter = Router();
const problemDao: IProblemDao = new ProblemDao();
const problemService: IProblemService = new ProblemService(problemDao);
const problemController = new ProblemController(problemService);

/**
 * Todo: Add Pagination
 */
problemRouter.get("/", problemController.getAllProblem.bind(problemController));
problemRouter.get(
	"/:name([a-zA-Z]+)",
	problemController.getProblemByName.bind(problemController),
);
/**
 * Todo: Add cors for internal system
 */
problemRouter.get(
	"/:id",
	problemController.getProblemById.bind(problemController),
);
problemRouter.post(
	"/",
	Validator.validateRequestBody(CreateProblem),
	problemController.createProblem.bind(problemController),
);
problemRouter.patch(
	"/:id",
	Validator.validateRequestBody(UpdateProblem),
	problemController.updateProblem.bind(problemController),
);
problemRouter.delete(
	"/:id",
	problemController.deleteProblem.bind(problemController),
);

export default problemRouter;
