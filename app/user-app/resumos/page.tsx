import Board from "@/components/resumos/board";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Resumos() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (!data?.user || error) {
        redirect('/')
    }
    return (
        <section className="min-h-screen flex w-full">
            <Board />
        </section>
    )
}