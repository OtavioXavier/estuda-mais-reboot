import { ClipboardList, ScrollText } from "lucide-react";
import { Button } from "../ui/button";
import { crimsonText } from "@/utils/fonts";
import clsx from "clsx";

interface ListItemProps {
    isSelected: boolean;
    site: string;
    type?: 'summary' | 'questions';
    id: string;
    onClick?: () => void
}

export default function ListItem({ isSelected, site, type = 'summary', onClick }: ListItemProps) {
    return (
        <li>
            <Button className={clsx(isSelected ? 'bg-main hover:bg-main hover:opacity-80' : 'bg-transparent border-2 border-text-zinc-400 text-zinc-400 hover:bg-main hover:text-white', "h-12 w-56 justify-normal gap-4  transition-all rounded-xl")} onClick={onClick}>
                {type === 'summary' ? <ScrollText /> : <ClipboardList />}

                <span className={`${crimsonText.className} `}>{type === 'summary' ? site : 'Questões'}</span>
            </Button>
        </li>
    )
}