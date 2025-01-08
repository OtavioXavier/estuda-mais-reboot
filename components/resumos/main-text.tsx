import { crimsonText, josefinSans } from "@/utils/fonts";
import { ScrollArea } from "../ui/scroll-area";

interface MainTextProps {
    paragrafos: string[],
    titulo: string,
    site: string
}

export default function MainText({ paragrafos, titulo, site }: MainTextProps) {
    return (
        <main className="flex-grow p-8">

            <header className="flex  justify-between">
                <h1 className={`${josefinSans.className} text-xl font-semibold`}>{titulo}</h1>
                <span className={`${josefinSans.className} text-sm text-muted-foreground`}>{site}</span>
            </header>
            <ScrollArea className="h-4/6 p-2">
                {paragrafos.map((paragrafo) => (
                    <p className={`${crimsonText.className} text-md`}>{paragrafo}</p>
                ))}
            </ScrollArea>
        </main>
    )
}