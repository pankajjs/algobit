"use client";

import uniqid from "uniqid";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { useContext } from "react";
import { UserSnippetContext } from "./UserSnippetContext";
import { useSession } from "next-auth/react";
import { socket } from "@/socket";
import axios from "axios";
import { RunResponseContext } from "./RunResponseContext";
import { LoadingSpinner } from "@/components/spinner";
import { Submission_Service_Api } from "@/constants";

export const Run = () => {
	const { userSnippetStatus } = useContext(UserSnippetContext);
	const { isRunResponse, setIsRunResponse } = useContext(RunResponseContext);
	const session: any = useSession();

	const onRun = async () => {
		setIsRunResponse(true);
		let userId: string;

		if (session.status === "authenticated") {
			userId = session.data.user.id;
		} else {
			userId = uniqid();
		}

		socket.emit("user_joined", userId);

		await axios.post(`${Submission_Service_Api}/api/v1/run`, {
			userId: userId,
			problemId: userSnippetStatus.problemId,
			code: userSnippetStatus.code,
			language: userSnippetStatus.language,
		});
	};

	return isRunResponse ? (
		<Button className="flex gap-2 text-sm" variant={"destructive"}>
			<LoadingSpinner className="mx-2" />
			<span className="text-white">Pending...</span>
		</Button>
	) : (
		<Button
			className="px-6 flex gap-2 text-sm"
			variant={"destructive"}
			onClick={onRun}
		>
			<PlayIcon size={15} />
			Run
		</Button>
	);
};
