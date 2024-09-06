"use client"

import { Signin } from "@/components/signin-button"
import { Run } from "./run-button"
import { Submit } from "./submit-button"
import { Logout } from "@/components/logout-button"
import { useSession } from "next-auth/react"

export const Header = () => {
    const session: any = useSession();

    return <div className="h-[7vh] px-5 flex items-center bg-gray-950">
       <div className="flex w-full justify-center gap-5 text-xs">
            <Run/>
            <Submit/>
       </div>

       {session.status === "unauthenticated" && <Signin/>}
       {session.status === "authenticated" && <Logout/>}
    </div>
}