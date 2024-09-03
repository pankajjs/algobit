import { AlgobitEditor } from "@/components/editor";
import axios from "axios";
import { notFound } from "next/navigation";


const ADMIN_SERVICE_API = "http://localhost:3000"

const getProblem = async (title: string) => {
    const response = await axios.get(`${ADMIN_SERVICE_API}/api/v1/problems/${title}`);
    if(!response.data.success) return;
    return response.data.data;
}

const getId = (id: string): string => {
    return id.split("").slice(0, 3).join("");
}

export default async function Problem (
    {params}:{params:{slug:string}}
){
    const name = params.slug
    const problem = await getProblem(name);

    if(!problem){
        notFound()
    }

    const id = problem.id;

    return <div className="flex p-2 bg-slate-800">
        <div className="min-w-[50%]">
            <div className="font-bold text-2xl text-gray-800">{getId(id)}. {problem.title}</div>
            <div className="">{problem.description}</div>
        </div>
        <AlgobitEditor problem={problem}/>
    </div>
}