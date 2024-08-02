import { CodeExecutor } from "./code_executor";
import { JavaCodeExecutor } from "./javacode_executor";
import { PythonCodeExecutor } from "./pythoncode_executor";

const codeExecutorFactory = (language: string): CodeExecutor => {
    if(language.toLowerCase() == "python"){
        return new PythonCodeExecutor();
    }
    
    return new JavaCodeExecutor();
}

export {
    codeExecutorFactory
}