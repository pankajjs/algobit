import { createContext } from "react";

export const SubmissionResponseContext = createContext({
	isSubmissionResponse: false,
	setIsSubmissionResponse: (_: boolean) => {},
});
