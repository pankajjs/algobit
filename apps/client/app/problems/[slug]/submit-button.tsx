"use client"

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useContext } from "react";
import { UserSnippetContext } from "./UserSnippetContext";
import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import axios from "axios";
import { SubmissionResponseContext } from "./SubmissionResponseContext";

const Submission_Service_Api = "http://localhost:5003"

export const Submit = ()=>{
    const {userSnippetStatus} = useContext(UserSnippetContext);
    const {isSubmissionResponse, setIsSubmissionResponse} = useContext(SubmissionResponseContext);
    const session:any = useSession();
   
    const onSubmit = async () => {
        if(session.status === "authenticated"){
            setIsSubmissionResponse(true);
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

    return isSubmissionResponse?<Button className="px-6 bg-green-600 hover:bg-green-800"><LoadingSpinner className="mx-2"/><span className="text-white">Pending...</span></Button>:
        <Button className="px-6 bg-green-600 flex gap-2 hover:bg-green-800" onClick={onSubmit}>
           <UploadIcon size={15}/> Submit
        </Button>
}

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
  }
  

export const LoadingSpinner = ({
    size = 18,
    className,
    ...props
  }: ISVGProps) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={"animate-spin " +  className}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    );
  };