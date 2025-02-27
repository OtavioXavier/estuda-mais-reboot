'use client'

import ListItem from "./list-item";
import { useEffect, useMemo, useState } from "react";
import MainText from "./main-text";
import { Questao, Resumo } from "@/types";
import QuestionsList from "./questions-list";

interface IBoard {
    resumos: Resumo[];
    questoes: Questao[] ;
}

export default function Board({ resumos, questoes }: IBoard) {
    const fakeSummary = useMemo(() => ({
        id: '',
        fonte: '',
        titulo: '',
        texto: '',
        link: '',
    }), []);

    const [selected, setSelected] = useState<string>('');
    const [summary, setSummary] = useState<Resumo>(fakeSummary);

    useEffect(() => {
        const selectedSummary = resumos.find((resumo) => resumo.id === selected) ?? fakeSummary;
        setSummary(selectedSummary);
    }, [selected, fakeSummary, resumos])

    return (
        <main className="min-h-screen md:flex w-full">
            <aside className="hidden md:flex w-64 min-h-screen justify-center p-4">
                <ul className="space-y-2">
                    {resumos.map((resumo, i) => (
                        <ListItem
                            isSelected={selected === resumo.id}
                            site={resumo.fonte} key={i}
                            onClick={() => setSelected(resumo.id)} />
                    ))}

                    <ListItem
                        type="questions"
                        isSelected={selected === 'questoes'}
                        onClick={() => setSelected('questoes')}
                    />

                </ul>
            </aside>
            <div className="mb-48 md:mb-0">
                {selected === 'questoes' ? <QuestionsList questoes={questoes} /> : <MainText {...summary} />}
            </div>

            <footer className="bg-main text-white w-full p-4 md:hidden h-24 rounded-t-xl fixed bottom-0 left-0 flex items-center justify-center">
                <div className="flex space-x-8">
                    {resumos.map((resumo, i) => (
                        <ListItem
                            key={i}
                            isSelected={selected === resumo.id}
                            site={resumo.fonte}
                            onClick={() => setSelected(resumo.id)} />
                    ))}
                    <ListItem
                        type="questions"
                        isSelected={selected === 'questoes'}
                        onClick={() => setSelected('questoes')} />
                </div>
            </footer>
        </main>
    )
}