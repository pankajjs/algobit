import { AlgobitEditor } from "@/components/editor";
import { Test } from "@/components/testcase";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import axios from "axios";
import { notFound } from "next/navigation";
import { Header } from "./header";
import { ProblemDetails } from "./problem-details";


const ADMIN_SERVICE_API = "http://localhost:3000"

const getProblem = async (title: string) => {
    const response = await axios.get(`${ADMIN_SERVICE_API}/api/v1/problems/${title}`);
    if(!response.data.success) return;
    return response.data.data;
}

export default async function Problem (
    {params}:{params:{slug:string}}
){
    const name = params.slug
    const problem = await getProblem(name);

    if(!problem){
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#252a31]">
        <Header/>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[93vh]"
        >
          <ResizablePanel defaultSize={50} minSize={4} maxSize={96} className="border-[1px] rounded-lg border-gray-500">
          <ProblemDetails problem={problem}/>
          </ResizablePanel>
          <ResizableHandle className="bg-black w-1"/>
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={80} className="border-[1px] rounded-lg border-gray-500">
                <AlgobitEditor problem={problem}/>
              </ResizablePanel>
              <ResizableHandle className="py-0.5 bg-black"/>
              <ResizablePanel defaultSize={20} minSize={5} maxSize={95}className="border-[1px] rounded-lg border-gray-500">
                 <div className="w-full">
                    <Test testCases={problem.testCases}/>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
        </div>
      )
}


