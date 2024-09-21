import { createContext } from "react";

export type UserSnippetStatus = {
	language: string;
	code: string;
	problemId: string;
};

type UserSnippetContext = {
	userSnippetStatus: UserSnippetStatus;
	setUserSnippetStatus: (_: UserSnippetStatus) => void;
};

export const UserSnippetContext = createContext<UserSnippetContext>({
	userSnippetStatus: { code: "", language: "", problemId: "" },
	setUserSnippetStatus: (_: UserSnippetStatus) => {},
});
