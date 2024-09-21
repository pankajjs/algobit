import {
	type CreateJobResponsePayload,
	type RunResponseJobPayload,
	Status,
} from "@repo/types";

import { RUN_RESPONSE_JOB } from "../constants";

export default function createJobResponsePayload({
	id,
	outputStream,
	status,
	testCases,
	jobName,
}: CreateJobResponsePayload): RunResponseJobPayload {
	const executionOutputList = outputStream.stdout.trim().split("\n");

	if (status === Status.Success) {
		const successTestCases = testCases.slice(0, 3);
		const input = successTestCases.map((tc) => tc.input);
		const output = successTestCases.map((tc) => tc.output);

		return {
			id: id,
			error: null,
			input,
			output,
			expectedOutput: output,
			status,
		};
	}

	if (status === Status.WA) {
		const expectedOutputList = testCases.map((tc) => tc.output);

		if (jobName === RUN_RESPONSE_JOB) {
			return {
				error: null,
				expectedOutput: expectedOutputList,
				id: id,
				input: testCases.map((tc) => tc.input),
				output: executionOutputList,
				status,
			};
		}

		let WATestCase = -1;

		executionOutputList.forEach((v, i) => {
			if (v != expectedOutputList[i]) {
				WATestCase = i;
				return;
			}
		});

		const input = [testCases[WATestCase].input];
		return {
			error: null,
			expectedOutput: [expectedOutputList[WATestCase]],
			id,
			input,
			output: [executionOutputList[WATestCase]],
			status,
		};
	}

	return {
		error: outputStream.stderr,
		id: id,
		status,
	};
}
