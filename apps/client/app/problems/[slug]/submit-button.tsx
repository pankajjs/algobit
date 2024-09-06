"use client"

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useContext } from "react";
import { UserSnippetContext } from "./UserSnippetContext";

export const Submit = ({userId}:{userId:string})=>{
    const userSnippet = useContext(UserSnippetContext);

    const onSubmit = () => {
        if(!userId){
            // TODO: toast message
            console.log("User not logged in");
            return;
        }
        console.log("user snippet", userSnippet);
    }

    return <>
        <Button className="px-6 bg-green-600 flex gap-2 hover:bg-green-800" onClick={onSubmit}>
            <UploadIcon size={15}/>Submit 
        </Button>
    </>
}