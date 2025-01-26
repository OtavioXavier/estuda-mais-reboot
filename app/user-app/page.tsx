import Generator from "@/components/user-app/generator";
import { josefinSans } from "@/utils/fonts";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserApp() {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (!data?.user || error) {
        redirect('/')
    }
    return (
        <div >
            <section className="flex flex-col items-center min-h-screen justify-center gap-8">
                <h1 className={`${josefinSans.className} font-bold text-xl`}>O que você vai estudar?</h1>
                <Generator />
            </section>
        </div>
    )
}