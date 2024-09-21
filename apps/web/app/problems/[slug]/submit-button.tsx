"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { useContext } from "react";
import { UserSnippetContext } from "./UserSnippetContext";
import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import axios from "axios";
import { SubmissionResponseContext } from "./SubmissionResponseContext";
import { LoadingSpinner } from "@/components/spinner";
import { Submission_Service_Api } from "@/constants";

export const Submit = () => {
	const { userSnippetStatus } = useContext(UserSnippetContext);
	const { isSubmissionResponse, setIsSubmissionResponse } = useContext(
		SubmissionResponseContext,
	);
	const session: any = useSession();

	const onSubmit = async () => {
		if (session.status === "authenticated") {
			setIsSubmissionResponse(true);
			socket.emit("user_joined", session.data.user.id);
			await axios.post(
				`${Submission_Service_Api}/api/v1/submissions/`,
				{
					userId: session.data.user.id,
					problemId: userSnippetStatus.problemId,
					code: userSnippetStatus.code,
					language: userSnippetStatus.language,
				},
			);
		} else {
			// TODO: toast message
			return;
		}
	};

	return isSubmissionResponse ? (
		<Button className="px-6 bg-green-600 hover:bg-green-800">
			<LoadingSpinner className="mx-2" />
			<span className="text-white">Pending...</span>
		</Button>
	) : (
		<Button
			className="px-6 bg-green-600 flex gap-2 hover:bg-green-800"
			onClick={onSubmit}
		>
			<UploadIcon size={15} /> Submit
		</Button>
	);
};
