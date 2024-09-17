import {problem} from "../model"
import { IProblem } from "../types";
import IProblemDao from "./iproblem_dao";

export default class ProblemDao implements IProblemDao {

    async isExit(id: string): Promise<boolean> {
        const doc = await problem.count({
            where: {id: id}
        })
        if(doc === 0) return false;
        return true;
    }

    async findByTitle(title: string): Promise<IProblem | null> {
        return  await problem.findUnique({
            where:{
                title: title
            },
        });
    }

    async findById(id: string): Promise<IProblem | null> {
        return await problem.findUnique({
            where: {id: id}
        });
    }

    async findAll(): Promise<IProblem[]> {
        return await problem.findMany();
    }

    async deleteById(id: string): Promise<void> {
        await problem.delete({
            where: {id: id},
        });
    }

    async updateById(id: string, data: Partial<IProblem>): Promise<IProblem | null> {
        return await problem.update({
            where: {
                id: id,
            },
            data: {
                ...data,
            }
        });
    }

    async create(data: IProblem): Promise<IProblem> {
       return problem.create({
        data: {
            description: data.description,
            difficulty: data.difficulty,
            timeLimit: data.timeLimit,
            title: data.title,
            codestubs: data.codestubs,
            testCases: data.testCases,
            editorial: data.editorial,
        }
       });
    }
}
