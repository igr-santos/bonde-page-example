'use client';
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'

export default function Admin() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const site = searchParams.get("site");
        if (site) {
            localStorage.setItem("editor:site", site);
            router.replace("/admin/editor");
        }
    }, []);

    // TODO, fazer o index do editor (selecionar o site)
    return <></>;
}
