'use client'
import { useEffect, useState } from "react";
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, CheckCheck, Clipboard, RefreshCcw, ScrollText } from "lucide-react";
import { Progress } from "../ui/progress";
import { Questao, Resumo } from "@/types";
import clsx from "clsx";
import { crimsonText, josefinSans } from "@/utils/fonts";
import { ScrollArea } from "../ui/scroll-area";

export default function Gerador() {
    const [assunto, setAsssunto] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [resumos, setResumos] = useState<Resumo[]>();
    const [questoes, setQuestoes] = useState<Questao[]>();
    const [resumoSelecionado, setResumoSelecionado] = useState<Resumo>();
    const [idSelecionado, setIdSelecionado] = useState<number>();

    const atribuirValores = (text: string) => {
        try {
            const sanitizedText = text.replace(/```json|```/g, '');
            const parsedData = JSON.parse(sanitizedText);

            setResumos(parsedData.resumos);
            setQuestoes(parsedData.questoes);
            console.log('valores foram atribuidos com sucesso!')
            console.log('Resumos: ', { resumos })
            console.log('Questões: ', { questoes })
        } catch (error) {
            console.log("Erro ao atribuir valores: ", error);
        }
    }

    const handleFinish = () => {
        setResumos([]);
        setQuestoes([]);
    }

    const handleGenerate = async () => {
        if (!assunto) return;

        try {
            setLoading(true);
            setProgress(20);

            const timer = setInterval(() => {
                setProgress((prev) => (prev < 66 ? prev + .2 : prev));
            }, 200);

            const google = createGoogleGenerativeAI({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY
            });

            const { text } = await generateText({
                model: google('gemini-1.5-pro-latest'),
                prompt: process.env.NEXT_PUBLIC_PROMPT,
            });

            atribuirValores(text);
            clearInterval(timer);
            setProgress(100);

            setTimeout(() => setProgress(0), 1500);
        } catch (error) {
            console.log("Erro dentro do gerador de textos: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectItem = (id: number) => {
        setIdSelecionado(id);
    }

    if (resumos && resumos.length > 0) {
        return (
            <div className="pt-8">
                <article className="float-left min-h-screen grid grid-flow-row pr-8">
                    <ScrollArea className={`h-[80vh] pr-8`}>
                        <nav>
                            <ul className="grid grid-flow-row space-y-2">
                                {resumos.map((resumo, i) => (
                                    <li key={i}>
                                        <Button className={
                                            clsx('w-48 h-12 overflow-x-hidden flex items-center justify-normal gap-4 p-2 font-semibold hover:bg-main hover:text-white text-slate-500 bg-transparent border-slate-500 border-2 hover:border-none rounded-lg', idSelecionado === resumo.id ?
                                                "bg-main text-white border-none" :
                                                '',
                                                `${josefinSans.className}`
                                            )
                                        }
                                            onClick={() => setIdSelecionado(resumo.id)}>
                                            {loading}
                                            <ScrollText size={32} strokeWidth={1} />
                                            {resumo.site}
                                        </Button>
                                    </li>
                                ))}
                                {questoes && (
                                    <li>
                                        <Button className={
                                            clsx('w-48 h-12 overflow-x-hidden flex items-center justify-normal gap-4 p-2 font-semibold hover:bg-main hover:text-white text-slate-500 bg-transparent border-slate-500 border-2 hover:border-none rounded-lg', idSelecionado === questoes[0].id ?
                                                "bg-main text-white border-none" :
                                                '',
                                                `${josefinSans.className}`
                                            )
                                        }
                                            onClick={() => setIdSelecionado(questoes[0].id)}>
                                            {loading}
                                            <Clipboard size={32} strokeWidth={1} />
                                            Questões
                                        </Button>
                                    </li>
                                )}

                            </ul>
                            <div className={"mt-20 grid grid-flow-row space-y-2"}>
                                <Button
                                    className="bg-main hover:bg-blue-500"
                                    onClick={handleGenerate} disabled={loading}>
                                    <RefreshCcw className={clsx(loading ? 'animate-spin' : '')} /> Gerar Novamente</Button>

                                <Button
                                    onClick={handleFinish}
                                    disabled={loading}>
                                    <ArrowLeftRight />Outro assunto</Button>
                            </div>
                        </nav>
                    </ScrollArea>
                </article>
                <section className="w-[90vw] h-[60vh] px-8">
                    <div className="md:flex justify-between items-start">
                        <h1 className={`${josefinSans.className} font-semibold text-2xl`}>{resumoSelecionado?.titulo}</h1>
                        <span className={`${josefinSans.className} text-sm text-slate-500`}>{resumoSelecionado?.site}</span>
                    </div>
                    <ScrollArea className={`text-lg h-[50vh]`}>
                        {questoes ? (<></>) : (<p className={`${crimsonText.className}`}>{resumoSelecionado?.conteudo}</p>)}
                    </ScrollArea>
                </section>

            </div>
        )

    } else {
        return (
            <div className="flex flex-col gap-4 justify-center items-center animate-fade-in-down duration-1000 transition-all">
                <h1 className="text-3xl font-bold mb-16">O que você vai estudar?</h1>

                <form action="">
                    <div className="flex items-center shadow-lg rounded-lg">
                        <Input name="assunto" className="md:w-96 h-12 focus:border-main rounded-tr-none rounded-br-none shadow-none" onChange={(e) => setAsssunto(e.target.value.toLowerCase())} />
                        <Button
                            disabled={assunto === '' || loading} className="h-12 w-12 rounded-tl-none rounded-bl-none bg-main hover:bg-blue-800 transition-all"
                            onClick={handleGenerate}
                            type="submit"
                        >
                            <CheckCheck />
                        </Button>


                    </div>
                </form>
                {loading && <Progress value={progress} className="md:w-96 transition-all duration-500 ease-in-out" />}
            </div>
        )
    }



}