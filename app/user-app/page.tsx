import { UserNav } from "@/components/commom/user-nav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import Logo from "../components/Logo";
import CardSession from "@/components/commom/card-session";
import { BookCopy, Calendar, History } from "lucide-react";
import Link from "next/link";

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
            <section className="flex md:flex-row flex-col items-center min-h-screen justify-center gap-16">
                <CardSession title="Estudar" description="Use esta seção para o seu momento de estudos.">
                    <BookCopy size={128} color="#007BFF" />
                </CardSession>
                <Link href={"/user-app/rotina"}>
                    <CardSession title="Rotina" description="Use esta seção para organizar a sua semana de estudos adicionando materias aos dias da semana.">
                        <Calendar size={128} color="#007BFF" />
                    </CardSession>
                </Link>

                <CardSession title="Historico" description="Sessão em construção">
                    <History size={128} color="#007BFF" />
                </CardSession>
            </section>
        </div>
    )
}