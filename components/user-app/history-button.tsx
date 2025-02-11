import Link from "next/link";
import { Button } from "../ui/button";
import { josefinSans } from "@/utils/fonts";
import { LucideTimer } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function HistoryButton() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: resumo } = await supabase
        .from('resumo')
        .select()
        .limit(1)
        .eq('usuario', user?.id)

    if (resumo?.length > 0) {
        return (
            <Link className={'absolute top-20 right-10'} href="/user-app/resumos" replace>
                <Button className={`${josefinSans.className} h-12 bg-main hover:bg-blue-800 `}>
                    <span className={`${josefinSans.className} text-white font-bold`}>Ultimo Resumo</span>
                    <LucideTimer />
                </Button>
            </Link>
        )
    } else {
        return <>
        </>
    }


}