import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import Generator from "@/components/user-app/generator";
import { josefinSans } from "@/utils/fonts";

export default async function UserApp() {
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
        <div>
            <section className="flex flex-col items-center min-h-screen justify-center gap-8">
                <h1 className={`${josefinSans.className} font-bold text-xl`}>O que você vai estudar?</h1>
                <Generator />
            </section>
        </div>
    )
}