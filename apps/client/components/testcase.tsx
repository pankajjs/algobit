"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export const Test = ({testCases}:{testCases:any})=>{
    const [showTestInput, setShowTestInput] = useState(false);
    const [showTestResult, setShowTestResult] = useState(false);

    return <div className="">
        <div className="border border-[#383839]">
            <Button className="text-gray-300" variant={"link"} onClick={()=>setShowTestInput(true)}>Test Input</Button>
            <Button className="text-slate-300" variant={"link"}>Test Result</Button>
        </div>
        {showTestInput && <div className="overflow-auto">
            <pre className="text-gray-300 px-4">{testCases.map((testcase:any, _:number)=>testcase.input).join("\n")}</pre>
        </div>}
    </div>
}