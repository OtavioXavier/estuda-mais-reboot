import { BookCopy } from "lucide-react"

interface LogoProps {
    theme: 'blue' | 'light',
    className?: string
}

export default function Logo({ theme, className }: LogoProps) {

    const color = theme === 'blue' ? 'main' : 'white'
    return (
      <div className={`${className} text-${color} flex items-center gap-2`}>
        <BookCopy />
        <span className={`font-semibold text-xl`}>Estuda+</span>
      </div>
)
}