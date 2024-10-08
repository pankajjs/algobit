"use client";

import { Signin } from "@/components/signin-button";
import { Run } from "./run-button";
import { Submit } from "./submit-button";
import { Logout } from "@/components/logout-button";
import { useSession } from "next-auth/react";
import { socket } from "@/socket";
import { useEffect } from "react";

export const Header = () => {
	const session: any = useSession();

	useEffect(() => {
		socket.on("connect", () => {
			console.log("user connected.");
		});

		return () => {
			socket.on("disconncted", () => {
				console.log("user disconnected");
			});
		};
	}, []);

	return (
		<div className="px-5 py-2 min-h-12 flex items-center bg-gray-950 min-w-full">
			<div className="flex w-full justify-center gap-5 text-xs">
				<Run />
				<Submit />
			</div>

			{session.status === "unauthenticated" && <Signin />}
			{session.status === "authenticated" && <Logout />}
		</div>
	);
};
