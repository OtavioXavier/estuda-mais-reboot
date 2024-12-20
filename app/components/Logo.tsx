import { josefinSans } from "@/utils/fonts";
import { BookCopy } from 'lucide-react';

interface LogoProps {
    theme: 'blue' | 'light';
    className?: string
}

export default function Logo({theme, className}: LogoProps) {
    let color = theme === 'blue' ? "#007BFF" : "#FFFFFF";
    let textColor = theme === 'blue' ? "text-main" : "text-white";

    return (
        <div className={`${className} flex items-center gap-2`}>
            <BookCopy color={color} strokeWidth={2}/>
            <p className={`${josefinSans.className} font-bold text-xl ${textColor} `}>Estuda+</p>
        </div>
    )
}