
import { NotFoundError } from "@repo/error";
import { sanitizedMarkdown } from "../helper";
import { IProblem, IProblemDao, IProblemService } from "@repo/types";

export default class ProblemService implements IProblemService {
    private problemDao: IProblemDao;

    constructor(problemDao: IProblemDao){
        this.problemDao = problemDao;
    }
    
    async findByTitle(title: string): Promise<IProblem | null> {
        const problem = await this.problemDao.findByTitle(title);
        
        if (!problem){
            throw new NotFoundError(`Problem not found with title=${title}`)
        }
        
        problem.testCases = problem.testCases.slice(0, 3)

        return problem;
    }

    async findById(id: string): Promise<IProblem | null> {
        const problem = await this.problemDao.findById(id);

        if (!problem){
            throw new NotFoundError(`Problem not found with id=${id}`)
        }

        return problem;
    }

    async findAll(): Promise<IProblem[]> {
        return await this.problemDao.findAll();
    }

    async deleteById(id: string): Promise<void> {
        await this.problemDao.deleteById(id);
    }

    async updateById(id: string, data: Partial<IProblem>): Promise<IProblem | null> {
        const isProblemExit = await this.problemDao.isExit(id);
        
        if(!isProblemExit){
            throw new NotFoundError(`Problem not found with id=${id}`)
        }
        
        if(data.description){
            data.description = sanitizedMarkdown(data.description);
        }

        return await this.problemDao.updateById(id, data);
    }

    async create(data: IProblem): Promise<IProblem> {
        if(data.description){
            data.description = sanitizedMarkdown(data.description);
        }
        return await this.problemDao.create(data);
    }

}