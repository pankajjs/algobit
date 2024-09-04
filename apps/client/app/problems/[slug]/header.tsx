"use client"

import { Button } from "@/components/ui/button"
import { PlayIcon, UploadIcon } from "@radix-ui/react-icons"

export const Header = () => {
    return <div className="h-[7vh] flex justify-center items-center gap-4 bg-gray-950">
        <Button className="px-6 flex gap-2" variant={"destructive"}>
            <PlayIcon className=""/>Run</Button>
        <Button className="px-6 bg-green-600 flex gap-2 hover:bg-green-800"><UploadIcon/>Submit</Button>
    </div>
}