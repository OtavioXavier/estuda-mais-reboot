'use client'
import { useSummary } from "@/context/SummaryContext";
import ListItem from "./list-item";
import { useEffect, useState } from "react";
import MainText from "./main-text";
import { Resumo } from "@/types";
import QuestionsList from "./questions-list";

export default function Board() {
    const { data } = useSummary();
    const { resumos, questoes } = data;

    const fakeSummary = {
        id: '',
        site: '',
        titulo: '',
        texto: '',
        link: ''
    }

    const [selected, setSelected] = useState<string>('');
    const [summary, setSummary] = useState<Resumo>(fakeSummary);

    useEffect(() => {
        const selectedSummary = resumos.find((resumo) => resumo.id === selected) ?? fakeSummary;
        setSummary(selectedSummary);
        console.log({ summary })
    }, [selected])

    return (
        <main className="min-h-screen flex w-full">
            <aside className="w-64 min-h-screen flex justify-center p-4">
                <ul className="space-y-2">
                    {resumos.map((resumo, i) => (
                        <ListItem isSelected={selected === resumo.id} site={resumo.site} key={i} onClick={() => setSelected(resumo.id)} />
                    ))}

                    <ListItem
                        type="questions"
                        isSelected={selected === 'questoes'}
                        onClick={() => setSelected('questoes')}
                    />

                </ul>
            </aside>
            {selected === 'questoes' ? <QuestionsList questoes={questoes} /> : <MainText {...summary} />}
        </main>
    )
}