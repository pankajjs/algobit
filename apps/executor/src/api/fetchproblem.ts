import axios from "axios";
import { IProblem } from "@repo/types";

export default async function fetchProblemDetails(url: string):Promise<IProblem | null> {
    const response =  await axios.get(`${url}`);
    if(!response.data.success) return null;
    return response.data.problem;
}
