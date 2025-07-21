'use client';
import React, { useCallback } from "react";
// import { createCSRClient } from "@/lib/graphql/client";
// import { getHostFromWindow } from '@/lib/graphql/getHost';
// import { getMobilizationByFilter } from "@/lib/graphql/queries";
// import { PageProvider, Page } from "@/lib/page";
import { PageProvider, Page } from "@/lib/page";
import Dashboard from "@/components/Dashboard";

export default function Editor() {
    return (
        <PageProvider>
            <Dashboard>
                <Page />
            </Dashboard>
        </PageProvider>
    );
}
