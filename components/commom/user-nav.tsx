"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserNav() {

    const [user, setUser] = useState<User | null>();
    const router = useRouter();

    const supabase = createClientComponentClient();

    const getUser = async () => {
        try {
            const {
                data: { user },
                error
            } = await supabase.auth.getUser();
            if (error) {
                throw new Error(`obtendo o usuario: ${error}`)
            } else {
                setUser(user);
            }

        } catch (error) {
            console.log("ocerreu um erro em user-nav ", error)
        };
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleSignout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.jpg" alt="avatar" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.email?.split('@')[0]}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignout} className="cursor-pointer">
                    Encerrar sessão
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}