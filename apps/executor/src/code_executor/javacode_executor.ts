import type { CodeExecutor, OutputStream } from "@repo/types";
import { JAVA_IMAGE, JAVA_TIME_LIMIT } from "../constants";
import executeCodeInDockerContainer from "./executor";

export default class JavaCodeExecutor implements CodeExecutor {
	async execute(
		code: string,
		input: string,
		timeLimit: number,
	): Promise<OutputStream> {
		try {
			const sanitizedCode = code.replace(/'/g, `"`);
			const commands: string[] = [
				"/bin/sh",
				"-c",
				`echo '${sanitizedCode}' > Main.java && javac Main.java && echo '${input}' | java Main`,
			];

			return await executeCodeInDockerContainer({
				image: JAVA_IMAGE,
				commands,
				languageTimeLimit: JAVA_TIME_LIMIT,
				timeLimit,
			});
		} catch (error) {
			logger.error(`Error while executing java code: ${error}`);
			throw error;
		}
	}
}
