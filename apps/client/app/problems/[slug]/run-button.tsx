"use client"

import uniqid from "uniqid";
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { useContext } from "react";
import { UserSnippetContext } from "./UserSnippetContext";
import { useSession } from "next-auth/react";
import { socket } from "@/socket";
import axios from "axios";

const Submission_Service_Api = "http://localhost:3002"

export const Run = () => {

    const {userSnippetStatus} = useContext(UserSnippetContext);
    const session:any = useSession();

    const onRun = async () => {
        let userId:string;
        if(session.status === "authenticated"){
            userId = session.data.user.id;
        }else{
            userId = uniqid();
        }
        console.log(userId);
        
        socket.emit("user_joined", userId)

        const response = await axios.post(`${Submission_Service_Api}/api/v1/submissions/run`, {
            userId: userId,
            problemId: userSnippetStatus.problemId,
            code: userSnippetStatus.code,
            language: userSnippetStatus.language
        })

        console.log(response.data)
    }
    
    return <>
    <Button className="px-6 flex gap-2 text-sm" variant={"destructive"} onClick={onRun}>
    <PlayIcon size={15}/>Run</Button>
    </>

}

