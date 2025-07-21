"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
// import { useMutation } from "urql";
import { createCSRClient } from "@/lib/graphql/client";
import { updateWidget as updateWidgetGql } from "@/lib/graphql/mutations";
import type { PageData, PagePlugin } from "../types/page";

interface PageContextValue {
    meta: PageData['meta'];
    blocks: PageData['blocks'];
    theme: PageData['theme'];
    updatePlugin: (plugin: PagePlugin) => void
}

const PageContext = createContext<PageContextValue | undefined>(undefined);

export default function PageProvider({ data, children }: { data: PageData, children: ReactNode }) {
    const [meta] = useState(data.meta);
    const [theme] = useState(data.theme);
    const [blocks, setBlocks] = useState(data.blocks);
    
    const client = createCSRClient();


    const updatePlugin = ({ id, ...updatedFields }: PagePlugin) => {
        // Atualiza no BONDE primeiro
        client.mutation(updateWidgetGql, { id: id, updated_fields: updatedFields }).then(result => {
            if (result.error) {
                console.error('Oh no!', result.error);
            } else {
                const { __typename, ...newPlugin } = result.data.update_widgets_by_pk
                // Depois atualiza no estado
                setBlocks(prevBlocks =>
                    prevBlocks.map(block => {
                        if (!block.plugins.some(p => p.id === newPlugin.id)) return block;
    
                        return {
                            ...block,
                            plugins: block.plugins.map(plugin =>
                                plugin.id === newPlugin.id ? newPlugin : plugin
                            )
                        }
                    })
                );
                console.log("TODO: Mensagem de sucesso!");
            }
        });
    };

    return (
        <PageContext.Provider value={{ meta, theme, blocks, updatePlugin }}>
            {children}
        </PageContext.Provider>
    );
}


export function usePageContext() {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePageContext must be used within a PageProvider');
    }
    return context;
}