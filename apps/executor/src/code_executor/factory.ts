import { CodeExecutor } from "@repo/types";
import PythonCodeExecutor from "./pythoncode_executor";
import JavaCodeExecutor from "./javacode_executor";

export default function codeExecutorFactory(language: string): CodeExecutor {
    if(language.toLowerCase() == "python"){
        return new PythonCodeExecutor();
    }
    
    return new JavaCodeExecutor();
}