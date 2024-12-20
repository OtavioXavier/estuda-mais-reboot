import DiaSemana from "@/components/rotina/dia-semana";
import { crimsonText, josefinSans } from "@/utils/fonts";

export default function Rotina() {
    return (
        <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className={`${josefinSans.className} font-semibold text-4xl`}>Monte a sua <span className="text-main">semana</span>  de estudos</h1>
                <p className={`${crimsonText.className} text-slate-500`}>Adicione uma matéria clicando no "<span className="text-main font-bold text-lg">+</span>" em baixo do dia da semana</p>
            </div>
            <div className="flex items-start justify-center mt-12">
               <DiaSemana dia="Segunda"/>
            </div>
        </section>
    )
}