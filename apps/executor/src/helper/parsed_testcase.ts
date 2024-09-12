import { TestCases } from "./types";

export const parsedTestCases = (testCases: TestCases): {
    input: string,
    output: string,
} => {
    const input = testCases.map(tc=>tc.input).join("\n").trim() || "";
    const output = testCases.map(tc=>tc.output).join("\n").trim() || "";
    
    return {
        input, output
    }
}
