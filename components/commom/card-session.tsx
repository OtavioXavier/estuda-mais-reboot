"use client"

import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ReactElement } from "react";

interface CardProps {
    title: string,
    description: string,
    children: React.ReactNode
}

export default function CardSession({
    title,
    description,
    children

}: CardProps) {
    return (
        <>
            <Card className="cursor-pointer h-80 w-72 hover:border-main transition-all duration-300 hover:text-main hover:-translate-y-3">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="h-16">{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    {children}
                </CardContent>
            </Card>
        </>
    )
}