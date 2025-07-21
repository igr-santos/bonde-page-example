"use client";
import React, { useCallback } from "react";
import { createContext } from "use-context-selector";
// import { getHostFromWindow } from "@/lib/graphql/getHost";
import { usePageDataLoader } from "../hooks";
import type { PageData, PagePlugin, PageBlock } from "../types/page";


type PageContextValue = {
    meta: PageData["meta"];
    blocks: PageData["blocks"];
    updateBlock: (block: PageBlock) => void;
    plugins: PageData["plugins"];
    updatePlugin: (plugin: PagePlugin) => void
    theme: PageData["theme"];
    editable: boolean;
}

export const PageContext = createContext<PageContextValue | null>(null);

export default function PageProvider({ children }: { children: React.ReactNode }) {
    const { state, dispatch } = usePageDataLoader({ slug: { _eq: "testes-de-widgets" } });

    const updateBlock = useCallback((block: PageBlock) => {
        dispatch({ type: "updateBlock", block });
    }, [dispatch]);

    const updatePlugin = useCallback((plugin: PagePlugin) => {
        dispatch({ type: "updatePlugin", plugin });
    }, [dispatch]);

    if (state?.loading) return <p>Carregando campanha</p>;
    if (state?.error) return <p>error: {state.error}</p>

    return (
        <PageContext.Provider
            value={{
                meta: state.meta,
                blocks: state.blocks,
                updateBlock: updateBlock,
                plugins: state.plugins,
                updatePlugin: updatePlugin,
                theme: state.theme,
                editable: state.editable
            }}
        >
            {children}
        </PageContext.Provider>
    );
}


export function PageServerProvider({
    children,
    data
}: {
    children: React.ReactNode,
    data: PageData
}) {
    return (
        <PageContext.Provider
            value={{
                meta: data.meta,
                blocks: data.blocks,
                plugins: data.plugins,
                theme: data.theme,
                // Métodos de manipulação do estado da página
                // não serão usados em renderizações SSR
                updatePlugin: () => {},
                updateBlock: () => {},
            }}
        >
            {children}
        </PageContext.Provider>
    );
}