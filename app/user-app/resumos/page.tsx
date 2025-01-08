import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import Board from "@/components/resumos/board";

export default async function Resumos() {
    let loggedIn = false;
    try {
        const supabase = createServerComponentClient({ cookies })
        const { data: { session } } = await supabase.auth.getSession();

        if (session) loggedIn = true;
    } catch (e) {
        console.log("User app:", e);
    } finally {
        if (!loggedIn) redirect("/", RedirectType.replace)
    }


    return (
        <section className="min-h-screen flex w-full">
            <Board />
        </section>
    )
}