"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { socket } from "@/socket";
import { RunResponseContext } from "./RunResponseContext";
import { Label } from "@/components/ui/label";

export const Test = ({ testCases }: { testCases: any }) => {
	const [showTestInput, setShowTestInput] = useState(false);
	const [showTestResult, setShowTestResult] = useState(false);
	const [testResult, setTestResult] = useState<any>();
	const { setIsRunResponse } = useContext(RunResponseContext);
	const [testCase, setTestCase] = useState(1);

	const handleRunResponse = useCallback((data: any) => {
		console.log(data);
		setShowTestInput(false);
		setShowTestResult(true);
		setTestResult(data);
		setIsRunResponse(false);
	}, []);

	useEffect(() => {
		socket.on("run-response", handleRunResponse);

		return () => {
			socket.off("run-response", handleRunResponse);
		};
	}, [handleRunResponse]);

	console.log(testResult);

	return (
		<div className="">
			<div className="border border-[#383839]">
				<Button
					className={(showTestInput && "underline") + " text-gray-300"}
					variant={"link"}
					onClick={() => {
						setShowTestResult(false);
						setShowTestInput(true);
					}}
				>
					Test Input
				</Button>
				<Button
					className={(showTestResult && "underline") + " text-slate-300"}
					variant={"link"}
					onClick={() => {
						setShowTestInput(false);
						setShowTestResult(true);
					}}
				>
					Test Result
				</Button>
			</div>
			{showTestInput && (
				<div className="overflow-auto">
					<pre className="text-gray-300 px-4">
						{testCases
							.map((testcase: any, _: number) => testcase.input)
							.join("\n")}
					</pre>
				</div>
			)}

			{showTestResult && testResult && (
				<div>
					{testResult.status === "Error" && (
						<div className="text-red-600">
							<div className="border-b-2 border-[#383839] p-2">
								{testResult.status}
							</div>
							<div className="p-2">{testResult.error}</div>
						</div>
					)}

					{testResult.status !== "Error" && (
						<div className="flex flex-col">
							<div
								className={
									(testResult.status === "WA"
										? "text-red-700"
										: "text-green-700") + " border-b-2 border-[#383839] p-2"
								}
							>
								{testResult.status === "WA"
									? "Wrong Answer"
									: testResult.status}
							</div>
							<div className="flex gap-4 p-2">
								{testResult.input.map((_: string, idx: number) => {
									return (
										<Button
											key={idx}
											onClick={() => {
												setTestCase(idx + 1);
											}}
											variant={"secondary"}
										>
											Test #{idx + 1}
										</Button>
									);
								})}
							</div>
							<div className="">
								{testResult.input.map((_: string, idx: number) => {
									return (
										<div key={idx} className="px-2">
											{testCase === idx + 1 && (
												<div>
													<Label className="text-slate-50">Input</Label>
													<pre
														className={
															(testResult.status === "WA"
																? "text-red-700"
																: "text-green-700") +
															" border-gray-700 border rounded-md px-4 py-2"
														}
													>
														{testResult.input[idx]}
													</pre>
													<Label className="text-slate-50">Output</Label>
													<pre
														className={
															(testResult.status === "WA"
																? "text-red-700"
																: "text-green-700") +
															" border-gray-700 border rounded-md px-4 py-2"
														}
													>
														{testResult.output[idx]}
													</pre>
													<Label className="text-slate-50">
														Expected Output
													</Label>
													<pre
														className={
															(testResult.status === "WA"
																? "text-red-700"
																: "text-green-700") +
															" border-gray-700 border rounded-md px-4 py-2"
														}
													>
														{testResult.expectedOutput[idx]}
													</pre>
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
