import Logo from "@/components/commom/logo";
import { UserNav } from "@/components/commom/user-nav";
import Link from "next/link";

export default function UserAppLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="py-4 px-8 border-b-2 shadow-2xl">
                <nav className="flex justify-between items-center">
                    <Link href={"/user-app"}>
                        <Logo theme="blue" />
                    </Link>
                    <UserNav />
                </nav>
            </header>
            <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-200 via-slate-50 to-neutral-50">
            {children}
            </div>
        </>
    )

}