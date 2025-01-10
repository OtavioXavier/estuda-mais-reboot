import { Questao } from "@/types"
import { Card, CardTitle } from "../ui/card"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

interface QuestionProps {
    questao: Questao
}

export default function Question({ questao }: QuestionProps) {
    return (
        <li key={questao.numero}>
            <Card className="p-4">
                <CardTitle>{questao.titulo}</CardTitle>
                <RadioGroup className="p-4">
                    {questao.alternativas?.map((alternativa, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <RadioGroupItem value={i.toString()} id={`r${i}`} />
                            <Label htmlFor={`r${i}`}>{alternativa}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </Card>
        </li>
    )
}