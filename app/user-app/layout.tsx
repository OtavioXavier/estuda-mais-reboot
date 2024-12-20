import { UserNav } from "@/components/commom/user-nav";
import Logo from "../components/Logo";
import Link from "next/link";

export default function UserAppLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="py-4 px-8 border-b-2 ">
                <nav className="flex justify-between items-center">
                    <Link href={"/user-app"}>
                        <Logo theme="blue" />
                    </Link>
                    <UserNav />
                </nav>
            </header>
            {children}
        </>
    )

}