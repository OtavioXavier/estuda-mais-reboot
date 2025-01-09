import { Questao } from "@/types"
import { Card, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { crimsonText, josefinSans } from "@/utils/fonts"
import { CheckCheck } from "lucide-react"

interface QuestionsListProps {
    questoes: Questao[]
}

export default function QuestionsList({ questoes }: QuestionsListProps) {

    return (
        <ScrollArea className="h-[80vh] w-full">
            <main className="flex-grow p-8 transition-all animate-fade-in-down">
                <ul className="space-y-2">
                    {questoes.map((questao) => (
                        <li key={questao.numero}>
                            <Card className="p-4">
                                <CardTitle>{questao.titulo}</CardTitle>
                                {questao.tipo === 'objetiva'
                                    ?
                                    <RadioGroup className="p-4">
                                        {questao.alternativas?.map((alternativa, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <RadioGroupItem value={i.toString()} id={`r${i}`} />
                                                <Label htmlFor={`r${i}`}>{alternativa}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    :
                                    <Textarea className="mt-4" placeholder="Qual é a resposta?" />
                                }
                            </Card>
                        </li>
                    ))}
                </ul>
                <Button disabled className={` transition-all bg-main hover:bg-main hover:opacity-80 float-end m-4 w-48 h-12 font-bold rounded-xl disabled:bg-transparent disabled:border disabled:border-zinc-500 disabled:text-zinc-400 disabled:border-text-z `}>Corrigir <CheckCheck /></Button>
            </main>
        </ScrollArea>
    )
}

'bg-transparent border-2 border-zinc-400 text-zinc-400 hover:bg-main hover:text-white'