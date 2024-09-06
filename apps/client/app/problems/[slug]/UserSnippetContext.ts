import { createContext } from "react";

export const UserSnippetContext = createContext({
    userSnippet: "",
    setUserSnippet: (_:string) => {}
})