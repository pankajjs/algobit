"use client"

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { UserSnippetContext } from "./UserSnippetContext";
import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import axios from "axios";

const Submission_Service_Api = "http://localhost:3002"

export const Submit = ()=>{
    const {userSnippetStatus} = useContext(UserSnippetContext);
    const session:any = useSession();
    // const []

    useEffect(()=>{
        socket.on("connect", ()=>{
            console.log("user connected.")
        })

        return ()=>{
            socket.on("disconncted", ()=>{
                console.log("user disconnected");
            })
        }
    }, [])

    const onSubmit = async () => {
        if(session.status === "authenticated"){
            socket.emit("user_joined", session.data.user.id)
            const response = await axios.post(`${Submission_Service_Api}/api/v1/submissions/`, {
                userId: session.data.user.id,
                problemId: userSnippetStatus.problemId,
                code: userSnippetStatus.code,
                language: userSnippetStatus.language
            })

            console.log(response.data)
        }else{
            // TODO: toast message
            console.log("User not logged in");
            return;
        }

        console.log("user snippet", userSnippetStatus.code);
    }

    return <>
        <Button className="px-6 bg-green-600 flex gap-2 hover:bg-green-800" onClick={onSubmit}>
            <UploadIcon size={15}/>Submit
        </Button>
    </>
}