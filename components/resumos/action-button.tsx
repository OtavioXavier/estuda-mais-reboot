import clsx from "clsx";
import { Button } from "../ui/button";
import { ListRestart, RotateCcw } from "lucide-react";

interface ActionButtonProps {
    type: 'restart' | 'refresh';
}

export default function ActionButton({ type }: ActionButtonProps) {

    return (
        <Button className={clsx(
            'bg-main bg-white hover:bg-main hover:text-white text text-main hover:opacity-80 transition-all',
            "h-12 md:w-56 justify-normal gap-4 transition-all rounded-xl"
        )}>
            <span className="hidden md:block">
                {type === 'restart' ? 're-gerar' : 're-iniciar'}
            </span>
            {type === 'refresh' ? <ListRestart /> : <RotateCcw />}
        </Button>
    )
}