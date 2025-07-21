'use client';
import React, { useCallback } from "react";
// import { createCSRClient } from "@/lib/graphql/client";
// import { getHostFromWindow } from '@/lib/graphql/getHost';
// import { getMobilizationByFilter } from "@/lib/graphql/queries";
// import { PageProvider, Page } from "@/lib/page";
import { PageProvider, Page } from "@/lib/page";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/lib/auth";

export default function Editor() {
    const { keycloak } = useAuth();

    return (
        <div>
            <button onClick={() => keycloak.logout()}>Sair</button>
            <PageProvider>
                <Dashboard>
                    <Page />
                </Dashboard>
            </PageProvider>
        </div>
    );
}
