import { type OutputStream, Status } from "@repo/types";

export default function evaluateExecutionOutput(
	outputStream: OutputStream,
	expectedOutput: string,
): Status {
	if (outputStream.stdout != "") {
		if (outputStream.stdout.trim() === expectedOutput) {
			return Status.Success;
		}
		return Status.WA;
	}

	return Status.Error;
}
