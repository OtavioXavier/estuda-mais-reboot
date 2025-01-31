'use client'

import { useSummary } from "@/context/SummaryContext";
import ListItem from "./list-item";
import { useEffect, useMemo, useState } from "react";
import MainText from "./main-text";
import { Resumo } from "@/types";
import QuestionsList from "./questions-list";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Board() {
    const { data } = useSummary();
    const { resumos, questoes } = data;

    const fakeSummary = useMemo(() => ({
        id: '',
        site: '',
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

    if (!data) {
        return <div>Carregando...</div>;
    }

    return (
        <main className="min-h-screen md:flex w-full">
            <aside className="hidden md:flex w-64 min-h-screen justify-center p-4">
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
            <div className="mb-48 md:mb-0">
                {selected === 'questoes' ? <QuestionsList questoes={questoes} /> : <MainText {...summary} />}
            </div>

            <footer className="bg-main text-white w-full p-4 md:hidden h-24 rounded-t-xl fixed bottom-0 left-0 flex items-center justify-center">
                <Carousel opts={{
                    align: "center",
                    loop: true,
                }}
                    className="w-full max-w-sm flex space-x-8"
                >
                    <CarouselContent className="-ml-1">
                        {resumos.map((resumo, i) => (
                            <CarouselItem className={"basis-24"} key={i}>
                                <ListItem isSelected={selected === resumo.id} site={resumo.site} onClick={() => setSelected(resumo.id)} />
                            </CarouselItem>
                        ))}
                        <CarouselItem className="basis-24">
                            <ListItem
                                type="questions"
                                isSelected={selected === 'questoes'}
                                onClick={() => setSelected('questoes')}
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <span className="">
                    </span>
                </Carousel>
            </footer>
        </main>
    )
}