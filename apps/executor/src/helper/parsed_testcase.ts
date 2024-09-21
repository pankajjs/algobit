import type { TestCases } from "@repo/types";

export default function parsedTestCases(testCases: TestCases): {
	input: string;
	output: string;
} {
	const input =
		testCases
			.map((tc) => tc.input)
			.join("\n")
			.trim() || "";
	const output =
		testCases
			.map((tc) => tc.output)
			.join("\n")
			.trim() || "";

	return {
		input,
		output,
	};
}
