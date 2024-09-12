import { db } from "./db";

const seed = async () => {
    const problems = [
        {
            title: "sum",
            description:  "Add two given numbers.",
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
    "userSnippet": `
class Solution {
    public static int add(int a, int b) {
    
    }
}`,
    "startSnippet": "import java.util.Scanner;",
    "endSnippet": `
public class Main {
    public static void processInput(Scanner scanner) {
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        int result = Solution.add(a, b);
        System.out.println(result);
    }
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextInt()) {
            processInput(scanner);
        }
        scanner.close();
    }
}`}
            ]
        },
        {
            title: "modulo",
            description:  "Given two number n1, n2.\n Returns modulo of n1 and n2",
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