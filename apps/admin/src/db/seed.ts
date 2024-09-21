import problem from "../model/problem";
import logger from "@repo/logger";

export default async function seedProblemData() {
	const p1 = {
		title: "sum",
		description: "Add two given numbers.",
		difficulty: "easy",
		testCases: [
			{
				input: "5\n3",
				output: "8",
			},
			{ input: "0\n2", output: "2" },
		],
		timeLimit: 1,
		codestubs: [
			{
				language: "python",
				userSnippet: `
class Solution:
    def add(a, b):`,
				startSnippet: `
import sys`,
				endSnippet: `
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
`,
			},
			{
				language: "java",
				userSnippet: `
class Solution {
    public static int add(int a, int b) {
    
    }
}`,
				startSnippet: "import java.util.Scanner;",
				endSnippet: `
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
}`,
			},
		],
	};

	const p2 = {
		title: "modulo",
		timeLimit: 2,
		difficulty: "Hard",
		description: "Given two numbers, returns modulo",
	};

	await problem.deleteMany();
	await problem.createMany({
		data: [p1, p2],
	});
	logger.info("seeded problem data.....");
}

seedProblemData();
