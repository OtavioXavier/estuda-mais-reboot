'use client'
import { useSummary } from "@/context/SummaryContext";
import ListItem from "./list-item";
import { useEffect, useState } from "react";
import MainText from "./main-text";
import { Resumo } from "@/types";

export default function Board() {
    const { data } = useSummary();
    const { resumos } = data;

    const fakeSummary = { id: '', site: '', titulo: '', paragrafos: [] }

    const [selected, setSelected] = useState<string>('');
    const [summary, setSummary] = useState<Resumo>(fakeSummary);

    useEffect(() => {
        const selectedSummary = resumos.find((resumo) => resumo.id === selected) ?? fakeSummary;
        setSummary(selectedSummary);
        console.log({ summary })
    }, [selected])
    return (
        <main className="min-h-screen flex w-full">
            <aside className="w-64 min-h-screen flex justify-center pt-4">
                <ul className="space-y-2">
                    {resumos.map((resumo, i) => (
                        <ListItem isSelected={selected === resumo.id} site={resumo.site} id={resumo.id} key={i} onClick={() => setSelected(resumo.id)} />
                    ))}
                </ul>
            </aside>
            <MainText {...summary} />
        </main>
    )
}