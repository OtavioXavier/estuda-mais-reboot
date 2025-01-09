import { Questao } from "@/types"
import { Card, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface QuestionProps {
    questao: Questao
}

export default function Question({ questao }: QuestionProps) {
    return (
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
    )
}