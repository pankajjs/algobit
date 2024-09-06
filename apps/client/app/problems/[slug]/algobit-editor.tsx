"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Header } from "./header"
import { ProblemDetails } from "./problem-details"
import { Test } from "./testcase"
import { CodeMirrorEditor } from "./codemirror-editor"
import { UserSnippetContext } from "./UserSnippetContext"
import { useEffect, useState } from "react"
import { socket } from "@/socket"

export const AlgobitEditor = ({problem}:{problem:any}) => {

    const [userSnippet, setUserSnippet] = useState("");
    const contextValue = {userSnippet, setUserSnippet};
    const [userId, setUserId] = useState("");

    useEffect(()=>{
        socket.on("joined", (data)=>{
           setUserId(data)
        })
        
        socket.on("connect", () => {
            console.log("Connected to the server with ID:", socket.id);
        });
    }, [])

    // @ts-ignore
    return  <UserSnippetContext.Provider value={contextValue}>
        <div className="min-h-screen bg-[#252a31]">
        <Header userId={userId}/>
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