"use client"

import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { useContext } from "react";
import { UserSnippetContext } from "./UserSnippetContext";

export const Run = () => {

    const userSnippet = useContext(UserSnippetContext);
    
    return <>
    <Button className="px-6 flex gap-2 text-sm" variant={"destructive"} onClick={()=>{
        console.log(userSnippet)
    }}>
    <PlayIcon size={15}/>Run</Button>
    </>

}

