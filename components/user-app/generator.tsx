'use client'

import { useActionState, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCheck, LoaderPinwheel } from "lucide-react";
import { generateSummary } from "@/app/actions";
import { schemaSummaryQuestions } from "@/types/schemas";
import { SQ } from "@/types";
import { useRouter } from "next/navigation";
import { useSummary } from "@/context/SummaryContext";


export default function Generator() {
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const { setSummary, setSubject } = useSummary();
    const router = useRouter();
    const [localSubject, setLocalSubject] = useState<string>('');

    const [result, handleGenerateSummary, isPending] = useActionState(generateSummary, null);

    useEffect(() => {
        if (result) {
            if (schemaSummaryQuestions.safeParse(result).success) {
                setSummary(result as SQ);
                setSubject(localSubject);
                setIsFinish(true);
                router.replace("/user-app/resumos");
            } else {
                console.log('erro de validacao');
            }
        }
    }, [result, localSubject, router, setSummary, setSubject])

    return (
        <div>
            <form action={handleGenerateSummary} className="flex items-center shadow-lg rounded-lg">
                <Input name="assunto" type="text" className="md:w-96 h-12 focus:border-main rounded-tr-none rounded-br-none bg-slate-100 shadow-none" onChange={(e) => setLocalSubject(e.target.value)} />
                <Button
                    disabled={isPending || isFinish}
                    className="h-12 w-12 hover:bg-blue-800 rounded-tl-none rounded-bl-none bg-main transition-all"
                    type="submit"
                >

                    {isPending ? <LoaderPinwheel className="animate-spin" /> : <CheckCheck />}
                </Button>
            </form>
            <p className="text-sm text-muted-foreground animate-fade-in-down">
                {typeof result === 'string' ? result : ''}
                {isFinish ? 'Redirecionando...' : ''}
            </p>
        </div>
    )
}
