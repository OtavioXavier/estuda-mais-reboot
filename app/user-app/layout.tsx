import Logo from "@/components/commom/logo";
import { UserNav } from "@/components/commom/user-nav";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function UserAppLayout({ children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <>
            <header className="py-4 px-8 border-b-2 shadow-2xl">
                <nav className="flex justify-between items-center">
                    <Link href={"/user-app"}>
                        <Logo theme="blue" />
                    </Link>
                    <UserNav user={user} />
                </nav>
            </header>
            <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-200 via-slate-50 to-neutral-50">
                {children}
            </div>
        </>
    )

}