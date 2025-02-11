import Board from "@/components/resumos/board";
import { Questao, Resumo } from "@/types";
import { createClient } from "@/utils/supabase/server";

export default async function Resumos() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: resumos } = await supabase
        .from('resumo')
        .select()
        .eq('usuario', user?.id)
        .returns<Resumo[]>();

    const { data: questoes } = await supabase
        .from('questao')
        .select()
        .eq('usuario', user?.id)
        .returns<Questao[]>();
        
    if (!resumos || !questoes) {
        return <p>Loading...</p>
    }

    return (
        <section className="min-h-screen flex w-full">
            <Board resumos={resumos} questoes={questoes} />
        </section>
    )
}