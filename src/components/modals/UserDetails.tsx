import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CopyIcon } from "lucide-react"

import React from 'react'

function Modal() {
    const url = "http://localhost:3000/FederatedLearning"
  return (
    <Dialog >
        <DialogTrigger className="bg-blue-950 px-5 text-white p-1 rounded-md shadow-md">API</DialogTrigger>
        <DialogContent className="bg-white">
            <DialogHeader>
            <DialogTitle>API URL</DialogTitle>
            <DialogDescription>
                <p className="flex gap-2 items-center">
                    {url}
                    <CopyIcon onClick={()=>navigator.clipboard.writeText(url)} className="w-4 h-4 translate-y-[1px] cursor-pointer hover:text-blue-600 active:text-blue-700" />
                </p>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default Modal