import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
    return (
        <>
            <h1>Error</h1>
            <Link href={"/"}>
                <Button>Voltar pro inicio</Button>
            </Link>
        </>
    )
}