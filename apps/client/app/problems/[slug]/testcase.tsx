"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "../../../components/ui/button"
import { socket } from "@/socket";

export const Test = ({testCases}:{testCases:any})=>{
    const [showTestInput, setShowTestInput] = useState(false);
    const [showTestResult, setShowTestResult] = useState(false);
    const [testResult, setTestResult] = useState(null);

    const handleRunResponse = useCallback((data: any) => {
        console.log(data)
        setShowTestInput(false)
        setShowTestResult(true);
        setTestResult(data);
    }, [])

    useEffect(() => {
        socket.on("run-response", handleRunResponse);

        return () => {
            socket.off("run-response", handleRunResponse);
        };
    }, [handleRunResponse]);


    return <div className="">
        <div className="border border-[#383839]">
            <Button className="text-gray-300" variant={"link"} onClick={()=>{
                setShowTestResult(false);
                setShowTestInput(true)
            }}>Test Input</Button>
            <Button className="text-slate-300" variant={"link"} onClick={
                ()=>{
                    setShowTestInput(false);
                    setShowTestResult(true);
                }
            }>Test Result</Button>
        </div>
        {showTestInput && <div className="overflow-auto">
            <pre className="text-gray-300 px-4">{testCases.map((testcase:any, _:number)=>testcase.input).join("\n")}</pre>
        </div>}

        {showTestResult && <div>{
            JSON.stringify(testResult)}
        </div>}
    </div>
}