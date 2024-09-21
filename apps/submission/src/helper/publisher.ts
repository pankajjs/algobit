import type { PublishJobParams } from "@repo/types";

export default async function publishJob(params: PublishJobParams) {
	try {
		await params.queue.add(params.name, params.payload, {
			priority: params.priority,
		});
	} catch (error) {
		logger.error(`Error while publishing ${params.name} job: ${error}`);
		throw error;
	}
}
