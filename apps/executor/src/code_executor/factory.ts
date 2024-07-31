import { CodeExecutor } from "./code_executor";
import { PythonCodeExecutor } from "./pythoncode_executor";

const codeExecutorFactory = (language: string): CodeExecutor => {
    if(language.toLowerCase() == "python"){
        return new PythonCodeExecutor();
    }else{
        return new PythonCodeExecutor();
    }
}

export {
    codeExecutorFactory
}