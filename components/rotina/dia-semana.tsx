"use client"

import { CirclePlus, PlusCircle, PlusSquare } from "lucide-react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"


interface DiaSemanaProps {
    dia: string
}

export default function DiaSemana({ dia }: DiaSemanaProps) {
    return (
        <div>
            <header className="h-12 w-44 rounded-t-xl bg-main text-white font-bold flex items-center justify-center border-main">{dia}</header>

            <Dialog>
                <DialogTrigger asChild>
                    <button className="h-12 w-44 rounded-t-none rounded-b-xl bg-secondaryWhite text-main flex items-center justify-center border-main border-2 hover:bg-main hover:text-white transition-all">
                        <PlusCircle size={28} strokeWidth={3} />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar Matéria</DialogTitle>
                        <DialogDescription>
                            Adicione uma matéria digitando
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}