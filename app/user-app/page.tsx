import Generator from "@/components/user-app/generator";
import HistoryButton from "@/components/user-app/history-button";
import { josefinSans } from "@/utils/fonts";

export default async function UserApp() {
    return (
        <div >
            <section className="flex flex-col items-center min-h-screen justify-center gap-8">
                <h1 className={`${josefinSans.className} font-bold text-xl`}>O que você vai estudar?</h1>
                <Generator />
                <HistoryButton />
            </section>
        </div>
    )
}