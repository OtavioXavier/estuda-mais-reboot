'use client'

import { Questao } from "@/types"
import { Card, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { CheckCheck, LoaderPinwheel } from "lucide-react"
import { josefinSans } from "@/utils/fonts"
import { useState } from "react"
import clsx from "clsx"
import { Button } from "../ui/button"
import { generateText } from 'ai';
import { google } from '../../utils/ai/gemini';

interface QuestionProps {
    questao: Questao,
    corrigir: boolean
}

export default function Question({ questao, corrigir }: QuestionProps) {
    const [alternativa, setAlternativa] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [why, setWhy] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleValueChange = (value: string) => {
        setAlternativa(value);
        if (corrigir) {
            setFeedback(value === questao.resposta ? 'correta' : 'incorreta');
        }
    };

    async function handleWhyQuestion() {
        try {
            console.log('Gerando justificativa...')
            setIsPending(true);
            const { text } = await generateText({
                model: google(
                    "gemini-2.0-flash-exp"
                ),
                prompt: `Na questão ${questao.pergunta}, Por que a resposta correta é ${questao.resposta}? responda de forma sucinta e indique um site para pesquisar melhor sobre o assunto`
            })

            setWhy(text);
        } catch (error) {

            console.log('Erro durante criação de justificativa: ', error)
        } finally {
            setIsPending(false);
        }
    }

    if (!corrigir && why !== '') {
        setWhy('');
    }

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
                    ))}
                    {corrigir && alternativa !== '' &&
                        <>
                            <div className="flex justify-between">
                                <div className={clsx(
                                    alternativa === questao.resposta ? 'bg-green-500' : 'bg-red-500'
                                    , "bg-opacity-65 rounded-l-lg h-8 flex justify-center items-center space-x-2 transition-all w-full"
                                )}>
                                    <CheckCheck />
                                    <p className={`${josefinSans.className}`}>
                                        Questão {feedback} {feedback === 'incorreta' && `- Resposta correta: ${questao.resposta}`}
                                    </p>
                                </div>
                                <Button className="h-8 rounded-l-none rounded-r-lg bg-main hover:bg-blue-800" onClick={() => handleWhyQuestion()}>
                                    Por quê?
                                </Button>
                            </div>
                            <div className=" text-zinc-500 text-sm">
                                {
                                    why !== '' && <>
                                        <p className="text-black font-bold">Resposta correta: {questao.resposta}</p>
                                        <p>{why}</p>
                                    </>
                                }
                                {
                                    isPending &&
                                    <LoaderPinwheel className="animate-spin" />
                                }
                            </div>
                        </>
                    }


                </RadioGroup>
            </Card>
        </li>
    )
}