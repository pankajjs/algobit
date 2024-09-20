import { ISubmission, ISubmissionDao, Status } from "@repo/types"
import { submission } from "../model";

export default class SubmissionDao implements ISubmissionDao {
    
    async isExit(id: string): Promise<boolean> {
        const doc = await submission.count({
            where: {id: id}
        })
        if(doc === 0) return false;
        return true;
    }

    async updateOne(id: string, data: Partial<ISubmission>): Promise<ISubmission | null> {
        return await submission.update({
            where:{
                id: id
            },
            data: {
                status: data.status,
                expectedOutput: data.expectedOutput,
                input: data.input,
                output: data.output,
                error: data.error,
            }
        })
    }

    async create(data: ISubmission): Promise<ISubmission> {
        return await submission.create({
            data: {
                code: data.code,
                language: data.language,
                problemId: data.problemId,
                userId: data.userId,
                status: Status.Pending,
            }
        });
    }

    async findAll(): Promise<ISubmission[]> {
        return await submission.findMany();
    }

    async findOne(id: string): Promise<ISubmission | null> {
        return await submission.findFirst({
            where: {
                OR:[
                    { id: id },
                    { userId: id }
                ],
                status: {
                    not: Status.Pending
                }
            }
        })
    }

    async findAllByUserId(id: string): Promise<ISubmission[]> {
        return await submission.findMany({
            where: {
                userId: id,
            },
            orderBy: {
                createdAt: "desc"
            }
        })   
    }
    
}