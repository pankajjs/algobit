"use client"

import { signIn } from "next-auth/react"
import { Button } from "./ui/button"

export const Signin = () => {
    const handleOnClick = () => {
        signIn("google");
    }
    return <Button className="p-0 text-white text-base" variant={"link"} onClick={handleOnClick}>
        Signin
    </Button>
}