"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { socket } from "@/socket";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import { SubmissionResponseContext } from "./SubmissionResponseContext";

const Submission_Service_Api = "http://localhost:5003";

const getUserSubmission = async (userId: string) => {
	const response = await axios.get(
		`${Submission_Service_Api}/api/v1/submissions?userId=${userId}`,
	);
	if (!response.data.success) return;
	return response.data.submissions;
};

export const ProblemDetails = ({ problem }: { problem: any }) => {
	const id = problem.id;
	const [showDescription, setShowDescription] = useState(true);
	const [showSubmissions, setShowSubmissions] = useState(false);
	const session: any = useSession();
	const [submissionList, setSubmissionList] = useState<any[]>([]);
	const [showSubmissionDetails, setShowSubmissionDetails] = useState(false);
	const [submissionDetails, setSubmissionDetails] = useState<any>();
	const { setIsSubmissionResponse } = useContext(SubmissionResponseContext);

	const handleSubmissionResponse = useCallback((data: any) => {
		setIsSubmissionResponse(false);
		console.log(data);
		setShowDescription(false);
		setShowSubmissions(true);
		setSubmissionList((prevList) => [data, ...prevList]);
		setShowSubmissionDetails(true);
		setSubmissionDetails(data);
	}, []);

	useEffect(() => {
		socket.on("submission-response", handleSubmissionResponse);

		return () => {
			socket.off("submission-response", handleSubmissionResponse);
		};
	}, [handleSubmissionResponse]);

	const handleSubmissionsClick = useCallback(async () => {
		setShowDescription(false);
		setShowSubmissions(true);
		if (session.status === "authenticated") {
			const submissions = await getUserSubmission(session.data.user.id);
			console.log(submissions);
			setSubmissionList(submissions);
		}
	}, [session]);

	return (
		<Suspense fallback={"Laoding....."}>
			<div className="min-w-[50%]">
				<div className="border border-[#383839]">
					<Button
						className={"text-gray-100 " + (showDescription && "underline")}
						variant={"link"}
						onClick={() => {
							setShowSubmissions(false);
							setShowDescription(true);
							setShowSubmissionDetails(false);
						}}
					>
						Description
					</Button>
					<Button
						className={"text-gray-100 " + (showSubmissions && "underline")}
						variant={"link"}
						onClick={handleSubmissionsClick}
					>
						Submissions
					</Button>
				</div>

				<div className="h-[88vh]">
					{showDescription && (
						<div className="font-bold text-gray-100">
							<div className="p-2 text-xl">
								{getId(id)}. {problem.title}
							</div>

							<div className="p-2 text-sm">{problem.description}</div>
						</div>
					)}

					{showSubmissions && (
						<div className="overflow-y-scroll h-full">
							{submissionList.map((submission: any, idx: number) => {
								const createdAt = new Date(submission.createdAt);
								return (
									<div key={submission.id + idx}>
										<div
											onClick={() => {
												if (
													showSubmissionDetails &&
													submissionDetails.id === submission.id
												) {
													setShowSubmissionDetails(false);
													return;
												}
												setShowSubmissionDetails(true);
												setSubmissionDetails(submission);
											}}
											className={
												"text-white p-2 border border-[#383839] hover:border-[#66666a] hover:cursor-pointer"
											}
										>
											<div className="flex w-max items-center gap-20 justify-between">
												<div className="min-w-max">
													<div
														className={
															(submission.status === "Success"
																? "text-green-400"
																: "text-red-500") + " text-sm"
														}
													>
														{submission.status}
													</div>
													<div className="text-xs text-gray-400">
														{createdAt.toDateString() +
															" " +
															createdAt.toLocaleTimeString()}
													</div>
												</div>
												<div className="capitalize text-sm text-gray-300  w-16 min-w-max">
													<span className=" bg-gray-700 px-2 py-0.5 border border-[#383839] rounded-lg">
														{submission.language}
													</span>
												</div>
											</div>
										</div>
										{showSubmissionDetails &&
											submissionDetails &&
											submissionDetails.id === submission.id && (
												<div className="flex flex-col p-5">
													<pre className="border border-gray-500 text-white p-2 text-xs rounded-md bg-[#2f2f30] text-wrap">
														{submissionDetails.code}
													</pre>
													{submissionDetails.error && (
														<div className="text-sm text-red-500 border p-2 mt-5 border-gray-500 bg-[#2f2f30] rounded-md">
															{submissionDetails.error}
														</div>
													)}
													{submissionDetails.status === "WA" && (
														<div className="text-white p-2 text-sm bg-[#2f2f30] border border-gray-500 mt-5 rounded-md flex flex-col gap-2">
															<div className="grid w-full max-w-sm items-center gap-1.5">
																<Label>Input</Label>
																{Array<string>(submissionDetails.input).map(
																	(tc: string, idx: number) => {
																		return (
																			<pre
																				key={idx}
																				onChange={() => {}}
																				className="border-gray-700 border rounded-md px-4 py-2"
																			>
																				{tc}
																			</pre>
																		);
																	},
																)}
															</div>
															<div className="grid w-full max-w-sm items-center gap-1.5">
																<Label>Output</Label>
																{Array<string>(submissionDetails.output).map(
																	(tc: string, idx: number) => {
																		return (
																			<pre
																				key={idx}
																				onChange={() => {}}
																				className="border-gray-700 border rounded-md px-4 py-2"
																			>
																				{tc}
																			</pre>
																		);
																	},
																)}
															</div>
															<div className="grid w-full max-w-sm items-center gap-1.5">
																<Label>Expected Output</Label>
																{Array<string>(
																	submissionDetails.expectedOutput,
																).map((tc: string, idx: number) => {
																	return (
																		<pre
																			key={idx}
																			onChange={() => {}}
																			className="border-gray-700 border rounded-md px-4 py-2"
																		>
																			{tc}
																		</pre>
																	);
																})}
															</div>
														</div>
													)}
												</div>
											)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</Suspense>
	);
};

const getId = (id: string): string => {
	return id.split("").slice(0, 3).join("");
};
