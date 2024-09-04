"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProblemDetails = ({problem}:{problem:any}) => {

    const id = problem.id;
    const [showDescription, setShowDescription] = useState(true);
    const [showSubmissions, setShowSubmissions] = useState(false);


    return (
    <div className="min-w-[50%] h-full">
        <div className="border border-[#383839]">
            <Button className={"text-gray-100 " + (showDescription && "underline")} variant={"link"} onClick={()=>{
                setShowSubmissions(false)
                setShowDescription(true)
            }}>Description</Button>
            <Button className={"text-gray-100 " + (showSubmissions && "underline")} variant={"link"} onClick={()=>{
                setShowDescription(false);
                setShowSubmissions(true)
            }}>Submissions</Button>
        </div>
      {
        showDescription &&<div className="font-bold text-gray-100">
            <div className="p-2 text-xl">
                {getId(id)}. {problem.title}
            </div>

            <div className="p-2 text-sm">
                { problem.description}
            </div>
        </div>
      }
      {showSubmissions && <div>
        </div>}
    </div>
    )
}

const getId = (id: string): string => {
    return id.split("").slice(0, 3).join("");
}