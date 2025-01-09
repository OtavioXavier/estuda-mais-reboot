import { crimsonText, josefinSans } from "@/utils/fonts";
import { ScrollArea } from "../ui/scroll-area";

interface MainTextProps {
    paragrafos: string[],
    titulo: string,
    site: string,
    link: string
}

export default function MainText({ texto, titulo, site, link }: MainTextProps) {
    return (
        <main className="flex-grow p-8 transition-all animate-fade-in-down">
            <header className="flex  justify-between">
                <h1 className={`${josefinSans.className} text-xl font-semibold`}>{titulo}</h1>
                <span className={`${josefinSans.className} text-sm text-muted-foreground`}>{site}</span>
            </header>
            <ScrollArea className="h-4/6 p-2">
                <p className={`${crimsonText.className} text-md `}>{texto}</p>
                {link != '' && (
                    <Link href={link} target="_blank" className="text-main font-semibold">Saiba mais aqui</Link>
                )}
            </ScrollArea>
        </main>
    )
}