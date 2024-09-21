"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export const Logout = () => {
	const onClickHandler = async () => {
		await signOut();
	};
	return (
		<Button onClick={onClickHandler} className="text-white" variant={"link"}>
			Logout
		</Button>
	);
};
