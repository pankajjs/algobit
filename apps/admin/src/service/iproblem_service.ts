import { IProblem } from "../types"

export default interface IProblemService {
    findByTitle(title: string): Promise<IProblem | null>
    findById(id: string): Promise<IProblem | null>
    findAll(): Promise<IProblem[]>
    deleteById(id: string):Promise<void>
    updateById(id: string, data: Partial<IProblem>): Promise<IProblem | null>
    create(data: IProblem): Promise<IProblem>
}