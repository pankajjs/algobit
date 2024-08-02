import { db } from "./db";

const seed = async () => {
    const problems = [
        {
            title: "sum",
            description:  "d1",
            difficulty: "easy",
            testCases: [
                {
                    input: "5\n3",
                    output: "8",
                },
                {input: "0\n2", output: "2"}
            ],
            timeLimit: 1,
            codestubs: [
                {
                    language: "python",
                    userSnippet: `
class Solution:
    def add(a, b):`,
                    startSnippet:`
import sys`,
                    endSnippet:`
class Main:
    def process_input():
        a = int(input())
        b = int(input())
        sol = Solution.add(a, b)
        print(sol)
    def main():
        while True:
            try:
                Main.process_input()
            except EOFError:
                break
Main.main()
` }
            ]
        },
        {
            title: "modulo",
            description:  "d2",
            difficulty: "medium",
            testCases: [
                {
                    input: "2\n3",
                    output: "2",
                },
                {input: "3\n1", output: "0"}
            ],
            timeLimit: 1,
        },
    ]

    await db.problem.deleteMany();
    await db.problem.createMany({
        data: problems,
    });
    console.log("seeding done");
}

seed();