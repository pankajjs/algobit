import axios from "axios";
import { notFound } from "next/navigation";
import { AlgobitEditor } from "./algobit-editor";
import { ADMIN_SERVICE_API } from "@/constants";

const getProblem = async (title: string) => {
	const response = await axios.get(
		`${ADMIN_SERVICE_API}/api/v1/problems/${title}`,
	);
	if (!response.data.success) return null;
	return response.data.problem;
};

export default async function Problem({
	params,
}: { params: { slug: string } }) {
	const name = params.slug;
	const problem = await getProblem(name);

	if (!problem) {
		notFound();
	}

	return <AlgobitEditor problem={problem} />;
}
