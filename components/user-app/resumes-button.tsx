'use client'

import Link from "next/link";
import { Button } from "../ui/button";
import { useSummary } from "@/context/SummaryContext";
import clsx from "clsx";
import { josefinSans } from "@/utils/fonts";
import { LucideTimer } from "lucide-react";

export default function ResumesButton() {
    const { isEmpty } = useSummary();

    return (
        <Link className={clsx(isEmpty ? 'hidden' : '', 'absolute top-20 right-10')} href="/user-app/resumos" replace>
            <Button className={`${josefinSans.className} h-12 bg-main hover:bg-blue-800 `}>
                <span className={`${josefinSans.className} text-white font-bold`}>Ultimo Resumo</span>
                <LucideTimer />
            </Button>
        </Link>

    )
}