"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Header } from "./header"
import { ProblemDetails } from "./problem-details"
import { Test } from "./testcase"
import { CodeMirrorEditor } from "./codemirror-editor"
import { UserSnippetContext, UserSnippetStatus } from "./UserSnippetContext"
import { useState } from "react"

export const AlgobitEditor = ({problem}:{problem:any}) => {

    const [userSnippetStatus, setUserSnippetStatus] = useState<UserSnippetStatus>({
        language: "",
        problemId: "",
        code: ""
    });

    const contextValue =  {userSnippetStatus, setUserSnippetStatus}

    // @ts-ignore
    return  <UserSnippetContext.Provider value={contextValue}>
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
                <CodeMirrorEditor problem={problem}/>
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
    </UserSnippetContext.Provider>
}