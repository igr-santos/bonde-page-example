'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PageProvider, Page } from "@/lib/page";
import Dashboard from "@/components/Dashboard";

export default function Editor() {
    const [site, setSite] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("editor:site");
        if (stored) {
            setSite(stored);
        } else {
            router.push("/admin?missing_context=true");
            toast.error("Página não encontrada", { description: "É preciso selecionar uma página para edição." });
        }
    }, [])

    if (!site) return <></>;
    
    return (
        <PageProvider site={site}>
            <Dashboard>
                <Page />
            </Dashboard>
        </PageProvider>
    );
}
