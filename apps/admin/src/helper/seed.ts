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
` },
{
    "language": "java",
    "userSnippet": "class Solution {\n    public static int add(int a, int b) {}",
    "startSnippet": "import java.util.Scanner;",
    "endSnippet": "public class Main {\n    public static void processInput(Scanner scanner) {\n        int a = scanner.nextInt();\n        int b = scanner.nextInt();\n        int result = Solution.add(a, b);\n        System.out.println(result);\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        while (scanner.hasNextInt()) {\n            processInput(scanner);\n        }\n        scanner.close();\n    }\n}"
  }
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