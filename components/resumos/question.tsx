'use client'

import { Questao } from "@/types"
import { Card, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { CheckCheck } from "lucide-react"
import { josefinSans } from "@/utils/fonts"
import { useState } from "react"
import clsx from "clsx"

interface QuestionProps {
    questao: Questao,
    corrigir: boolean
}

export default function Question({ questao, corrigir }: QuestionProps) {
    const [alternativa, setAlternativa] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');

    const handleValueChange = (value: string) => {
        setAlternativa(value);
        if (corrigir) {
            setFeedback(value === questao.resposta ? 'correta' : 'incorreta');
        }
    };
    console.log(questao.resposta)
    return (
        <li>
            <Card className="p-4 transition-all">
                <CardTitle className={`${josefinSans.className}`}>{questao.pergunta}</CardTitle>
                <RadioGroup disabled={corrigir} onValueChange={handleValueChange} className="p-4 transition-all">
                    {questao.alternativas?.map((alternativa, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem
                                className="transition-all"
                                value={alternativa}
                                id={`r${i}`} />

                            <Label className={`${josefinSans.className}`} htmlFor={`r${i}`}>{alternativa}</Label>
                        </div>
                    ))}{corrigir && alternativa !== '' &&
                        <div className={clsx(
                            alternativa === questao.resposta ? 'bg-green-500' : 'bg-red-500'
                            , " bg-opacity-65 rounded-lg h-8 flex justify-center items-center space-x-2 hover:scale-95 transition-all"
                        )}>
                            <CheckCheck />
                            <p className={`${josefinSans.className}`}>
                                Questão {feedback} {feedback === 'incorreta' && `- Resposta correta: ${questao.resposta}`}
                            </p>
                        </div>}
                </RadioGroup>
            </Card>
        </li>
    )
}