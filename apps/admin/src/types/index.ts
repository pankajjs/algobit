export type IProblem = {
    id: String;
    title: string;
    description: string;
    editorial?: string | null;
    difficulty: string;
    testCases:   {
        input: string,
        output: string
    }[],

    timeLimit: number;
    codestubs:{
            language: string
            startSnippet: string
            userSnippet: string
            endSnippet: string
        }[],
    createdAt: Date;
    updatedAt: Date;
}