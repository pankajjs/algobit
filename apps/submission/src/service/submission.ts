import { ISubmission, ISubmissionDao, ISubmissionService } from "@repo/types";
import { SUBMISSION_REQUEST_JOB } from "../constants";
import { publishJob } from "../helper";
import { NotFoundError } from "@repo/error";
import { requestQueue } from "../queue";

export default class SubmissionService implements ISubmissionService{

    private submissionDao: ISubmissionDao;

    constructor(submissionDao: ISubmissionDao){
        this.submissionDao = submissionDao;
    }

    async updateOne(id: string, data: Partial<ISubmission>): Promise<ISubmission | null> {
        const isSubmissionExit = await this.submissionDao.isExit(id);
        
        if(!isSubmissionExit){
            throw new NotFoundError(`Submission not found with id=${id}`)
        }

        return await this.submissionDao.updateOne(id, data);
    }
    
    async create(data: ISubmission): Promise<ISubmission> {
        const submission = await this.submissionDao.create(data);

        await publishJob({
            name: SUBMISSION_REQUEST_JOB,
            payload: {
                id: submission.id,
                code: submission.code,
                language: submission.language, 
                problemId: submission.problemId,
                userId: submission.userId,
            },
            queue: requestQueue,
        })

        return submission;
    }

    async findAll(): Promise<ISubmission[]> {
        return await this.submissionDao.findAll();
    }

    async findOne(id: string): Promise<ISubmission | null> {
        const submission =  await this.submissionDao.findOne(id);
       
        if(!submission){
            throw new NotFoundError(`Submission not found`);
        }
        
        return submission;
    }

    async findAllByUserId(id: string): Promise<ISubmission[]> {
        return await this.submissionDao.findAllByUserId(id);
    }
}