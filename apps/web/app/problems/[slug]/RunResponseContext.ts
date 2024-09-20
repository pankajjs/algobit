import { createContext } from "react";

export const RunResponseContext = createContext({
    isRunResponse: false,
    setIsRunResponse:(_:boolean)=>{}
})