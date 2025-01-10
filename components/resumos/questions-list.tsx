import { Questao } from "@/types"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { CheckCheck } from "lucide-react"
import Question from "./question"

interface QuestionsListProps {
    questoes: Questao[]
}

export default function QuestionsList({ questoes }: QuestionsListProps) {

    return (
        <ScrollArea className="h-[80vh] w-full">
            <main className="flex-grow p-8 transition-all animate-fade-in-down">
                <ul className="space-y-2">
                    {questoes.map((questao, i) => (
                        <Question key={i} questao={questao} />
                    ))}
                </ul>
                <Button disabled className={` transition-all bg-main hover:bg-main hover:opacity-80 float-end m-4 w-48 h-12 font-bold rounded-xl disabled:bg-transparent disabled:border disabled:border-zinc-500 disabled:text-zinc-400 disabled:border-text-z `}>Corrigir <CheckCheck /></Button>
            </main>
        </ScrollArea>
    )
}