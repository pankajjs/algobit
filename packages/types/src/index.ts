import { z } from "zod";
import { type ConnectionOptions, Queue, Job, Worker } from "bullmq";

export { Job, Worker, Queue };

export enum Task {
	RUN = "run",
	SUBMIT = "submit",
}

export type TestCases = { input: string; output: string }[];
export const CreateProblem = z
	.object({
		title: z.string().min(3, "Must be atleast 3 characters long."),
		description: z.string().min(10, "Must be 10 characters long."),
		difficulty: z
			.string()
			.refine(
				(value) => ["easy", "medium", "hard"].includes(value),
				"Must be any one of these [easy, hard, medium]",
			),
		editorial: z.string().optional(),
		testCases: z.array(
			z.object({
				input: z.string(),
				output: z.string(),
			}),
			{ message: "Must have atleast 1 testcase" },
		),
		codeStubs: z.array(
			z.object({
				language: z.string().min(1, "Must be atleast 1 character long"),
				userSnippet: z.string().min(1, "Must be atleast 1 character long"),
				startSnippet: z.string().min(1, "Must be atleast 1 character long"),
				endSnippet: z.string().min(1, "Must be atleast 1 character long"),
			}),
		),
		timeLimit: z.coerce.number().gt(0, "Must be greater than 0."),
	})
	.strict();

export type ICreateProblem = z.infer<typeof CreateProblem>;
export const UpdateProblem = CreateProblem.partial();
export type IUpdateProblem = z.infer<typeof UpdateProblem>;

export interface IProblemService {
	findByTitle(title: string): Promise<IProblem | null>;
	findById(id: string): Promise<IProblem | null>;
	findAll(): Promise<IProblem[]>;
	deleteById(id: string): Promise<void>;
	updateById(id: string, data: Partial<IProblem>): Promise<IProblem | null>;
	create(data: IProblem): Promise<IProblem>;
}

export interface IProblemDao {
	findByTitle(title: string): Promise<IProblem | null>;
	findById(id: string): Promise<IProblem | null>;
	findAll(): Promise<IProblem[]>;
	deleteById(id: string): Promise<void>;
	updateById(id: string, data: Partial<IProblem>): Promise<IProblem | null>;
	create(data: IProblem): Promise<IProblem>;
	isExit(id: string): Promise<boolean>;
}

export const CreateSubmission = z
	.object({
		userId: z.string(),
		problemId: z.string(),
		code: z.string(),
		language: z.string(),
	})
	.strict();

export type ICreateSubmission = z.infer<typeof CreateSubmission>;

export enum Status {
	Pending = "Pending",
	Success = "Success",
	WA = "WA",
	Error = "Error",
}

export type ISubmission = {
	id: string;
	problemId: string;
	userId: string;
	code: string;
	language: string;
	createdAt: Date;
	status: string;
	input?: string | null;
	error?: string | null;
	output?: string | null;
	expectedOutput?: string | null;
};

export type OutputStream = {
	stderr: string;
	stdout: string;
};

export type ExecuteCodeParam = {
	image: string;
	commands: string[];
	timeLimit: number;
	languageTimeLimit: number;
};

export type RunResponseJobPayload = {
	id: string;
	status: Status;
	error: string | null;
	output?: string[];
	expectedOutput?: string[];
	input?: string[];
};

export type SubmissionResponsePayload = {
	code: string;
	createdAt: Date;
	language: string;
	problemId: string;
	userId: string;
} & RunResponseJobPayload;

export type SubmissionRequestJobPayload = {
	id: string;
	code: string;
	language: string;
	problemId: string;
	userId: string;
};

export type RunRequestJobPayload = {
	id: string;
	code: string;
	language: string;
	problemId: string;
};

export interface ISubmissionService {
	create(data: ISubmission): Promise<ISubmission>;
	findAll(): Promise<ISubmission[]>;
	findOne(id: string): Promise<ISubmission | null>;
	findAllByUserId(id: string): Promise<ISubmission[]>;
	updateOne(
		id: string,
		data: Partial<ISubmission>,
	): Promise<ISubmission | null>;
}

export interface ISubmissionDao {
	create(data: ISubmission): Promise<ISubmission>;
	findAll(): Promise<ISubmission[]>;
	findOne(id: string): Promise<ISubmission | null>;
	findAllByUserId(id: string): Promise<ISubmission[]>;
	isExit(id: string): Promise<boolean>;
	updateOne(
		id: string,
		data: Partial<ISubmission>,
	): Promise<ISubmission | null>;
}

export interface CodeExecutor {
	execute(
		code: string,
		input: string,
		timeLimit: number,
	): Promise<OutputStream>;
}

export type CreateJobResponsePayload = {
	status: Status;
	id: string;
	outputStream: OutputStream;
	testCases: TestCases;
	jobName: string;
};

export type IProblem = {
	id: string;
	title: string;
	description: string;
	editorial?: string | null;
	difficulty: string;
	testCases: {
		input: string;
		output: string;
	}[];

	timeLimit: number;
	codestubs: {
		language: string;
		startSnippet: string;
		userSnippet: string;
		endSnippet: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
};

export type CreateQueue = {
	name: string;
	options: ConnectionOptions;
};

export type PublishJobParams = {
	name: string;
	payload:
		| SubmissionRequestJobPayload
		| RunRequestJobPayload
		| RunResponseJobPayload;
	priority?: number;
	queue: Queue;
};
