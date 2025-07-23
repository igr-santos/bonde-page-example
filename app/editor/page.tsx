'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Editor() {
    // Redireciona o Usuário para o administrador, isso evita a necessidade de lidar com vários
    // domínios do redirect_uri do serviço de Autenticação e Autorização (Keycloak)
    const router = useRouter();

    useEffect(() => {
        const site = window.location.host;
        router.push(`https://editor.bonde.devel/admin?site=${site}`);
    }, []);

    return <></>;
}
