'use client'

import { Questao } from "@/types"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { CheckCheck, X } from "lucide-react"
import Question from "./question"
import { useState } from "react"
import clsx from "clsx"

interface QuestionsListProps {
    questoes: Questao[]
}

export default function QuestionsList({ questoes }: QuestionsListProps) {
    const [corrigir, setCorrigir] = useState<boolean>(false);

    return (
        <ScrollArea className="h-[80vh] w-full transition-all">
            <main className="flex-grow p-8 transition-all animate-fade-in-down">
                <ul className="space-y-2">
                    {questoes.map((questao, i) => (
                        <Question key={i} questao={questao} corrigir={corrigir} />
                    ))}
                </ul>
                <Button onClick={() => { setCorrigir(!corrigir) }} className={clsx(corrigir ? 'bg-red-500 hover:bg-red-500 ' : 'bg-main hover:bg-main',
                    `transition-all hover:bg-opacity-80 float-end m-4 w-48 h-12 font-bold rounded-xl disabled:bg-transparent disabled:border disabled:border-zinc-500 disabled:text-zinc-400 disabled:border-text-z md:absolute z-20 bottom-0 right-4`
                )}>
                    {corrigir ? 'Cancelar' : 'Corrigir'}
                    {corrigir ? <X /> : <CheckCheck />}

                </Button>
            </main>
        </ScrollArea>
    )
}