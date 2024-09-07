"use client"

import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Submission_Service_Api = "http://localhost:3002"

const getUserSubmission = async (userId: string) => {
    try{
        const response = await axios.get(`${Submission_Service_Api}/api/v1/submissions?userId=${userId}`);
        return response.data.data;
    }catch(error){
        console.log(error);
    }
}

export const ProblemDetails = ({problem}:{problem:any}) => {

    const id = problem.id;
    const [showDescription, setShowDescription] = useState(true);
    const [showSubmissions, setShowSubmissions] = useState(false);
    const session:any = useSession();
    const [submissionsDetails, setSubmissionsDetails] = useState<any[]>([]);

    useEffect(()=>{
        socket.on("submission-response", (data)=>{
            console.log(data)
            setShowDescription(false)
            setShowSubmissions(true);
            setSubmissionsDetails(prev=>[...prev, data]);
        })
    }, [])

    return (
    <div className="min-w-[50%]">
        <div className="border border-[#383839]">
            <Button className={"text-gray-100 " + (showDescription && "underline")} variant={"link"} onClick={()=>{
                setShowSubmissions(false)
                setShowDescription(true)
            }}>Description</Button>
            <Button className={"text-gray-100 " + (showSubmissions && "underline")} variant={"link"} onClick={async ()=>{
                setShowDescription(false);
                setShowSubmissions(true)
                if(session.status === "authenticated"){
                   const submissions  = await getUserSubmission(session.data.user.id);
                   console.log(submissions);
                   setSubmissionsDetails(submissions)
                }
            }}>Submissions</Button>
        </div>

        <div className="h-[88vh]">
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
    {showSubmissions && <div className="overflow-y-scroll h-full">
        {submissionsDetails.map((submission:any, idx:number)=>{
            const createdAt = new Date(submission.createdAt);
            return <div key={submission.id + idx} className={"text-white p-2 border border-[#383839]"}>
               <div className="flex min-w-max items-center gap-20">
                    <div className="min-w-max">
                        <div className={submission.status === "Error"?"text-red-500":"text-green-400" + " text-sm"}>{submission.status}</div>
                        <div className="text-xs text-gray-400">{createdAt.toDateString() + " " + createdAt.toLocaleTimeString()}</div>
                    </div>
                    <div className="capitalize text-sm text-gray-300  w-16 min-w-max">
                        <span className=" bg-gray-700 px-2 py-0.5 border border-[#383839] rounded-lg">{submission.language}</span></div>
                    <Button variant={"link"} className="text-gray-300 border border-[#383839] items-end">View details</Button>
               </div>
            </div>
        })}
     </div>}
     </div>
    </div>
    )
}

const getId = (id: string): string => {
    return id.split("").slice(0, 3).join("");
}