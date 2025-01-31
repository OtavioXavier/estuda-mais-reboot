import { ClipboardList, ScrollText } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface ListItemProps {
    isSelected: boolean;
    site?: string;
    type?: 'summary' | 'questions';
    onClick?: () => void;
}

export default function ListItem({ isSelected, site, type = 'summary', onClick }: ListItemProps) {
    return (
        <Button className={clsx(
            isSelected ?
                'bg-main hover:bg-main hover:opacity-80' :
                'bg-transparent border border-zinc-400 text-zinc-400 hover:bg-main  hover:text-white',
            "h-12 md:w-56 justify-normal gap-4  transition-all rounded-xl"
        )} onClick={onClick}>
            {type === 'summary' ? <ScrollText /> : <ClipboardList />}

            <span className={`hidden md:block truncate max-w-full overflow-hidden text-ellipsis`}>{type === 'summary' ? site : 'Questões'}</span>
        </Button>
    )
}