"use client";
import React, { useCallback, useState } from "react";
import { createContext } from "use-context-selector";
import { toast } from "sonner";

import { createCSRClient } from "@/lib/graphql/client";
import { updateWidgetGql, updateBlockGql, updateBlocksGql } from "@/lib/graphql/mutations";

import { usePageDataLoader } from "../hooks";
import type { PageData, PagePlugin, PageBlock } from "../types/page";


type Notification = {
    id: string;
    kind: "success" | "error" | "info";
    message: "string";
}

const Notifications = ({ notifications }: { notifications: Notification[] }) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((n) => (
                <div
                    key={n.id}
                    className={`px-4 py-2 rounded shadow-lg text-white transition-transform ease-out transform translate-y-0 opacity-100
                        ${n.kind === "success" ? "bg-green-600" : ""}
                        ${n.kind === "error" ? "bg-red-600" : ""}
                        ${n.kind === "info" ? "bg-blue-600" : ""}
                    `}
                >
                    {n.message}
                </div>
            ))}
        </div>
    )
}

type PageContextValue = {
    meta: PageData["meta"];
    blocks: PageData["blocks"];
    updateBlock: (block: PageBlock) => void;
    moveBlock: (active: PageBlock, over: PageBlock) => void;
    plugins: PageData["plugins"];
    updatePlugin: (plugin: PagePlugin) => void
    theme: PageData["theme"];
    editable: boolean;
}

export const PageContext = createContext<PageContextValue | null>(null);

export default function PageProvider({ children, site }: { children: React.ReactNode, site?: string }) {
    const { state, dispatch } = usePageDataLoader(
        site?.includes(".bonde.devel")
            ? { slug: { _eq: site?.replace(".bonde.devel", "") } }
            : { custom_domain: { _eq: `www.${site?.replace("www", "")}` } }
        );

    const updateBlock = useCallback(({ id, __typename, ...updatedFields }: PageBlock) => {
        // TODO: update on GraphQL API
        const client = createCSRClient();
        // console.log("updateBlock", { id, updatedFields });

        client.mutation(updateBlockGql, {
            id: id,
            updated_fields: updatedFields
        })
            .toPromise()
            .then((result) => {
                console.log(result);
                dispatch({ type: "updateBlock", block: result.data?.update_blocks_by_pk });
                toast.success("Bloco atualizado com sucesso.");
            }).catch((err) => {
                console.error("updateBlock ->> GraphQL:", err);
            })

    }, [dispatch]);

    const moveBlock = (active: { id: number }, over: { id: number }) => {
        const fromIndex = state.blocks.findIndex((block: PageBlock) => block.id === active.id);
        const toIndex = state.blocks.findIndex((block: PageBlock) => block.id === over.id);

        // console.log("moveBlock", { fromIndex, toIndex, state });

        if (fromIndex === -1 || toIndex === -1) return state;

        // Cria uma cópia ordenada dos blocos
        const sortedBlocks = [...state.blocks].sort((a, b) => a.position - b.position);

        // Remove o bloco da posição original
        const [movedBlock] = sortedBlocks.splice(fromIndex, 1);

        // Insere o bloco na nova posição
        sortedBlocks.splice(toIndex, 0, movedBlock);

        // Reatribui a posição de todos os blocos
        const reindexedBlocks = sortedBlocks.map((block, index) => ({
            ...block,
            position: index + 1,
        }));

        // TODO: update on GraphQL API
        const client = createCSRClient();
        const updates = reindexedBlocks.map(block => ({ where: { id: { _eq: block.id } }, _set: { position: block.position } }));
        // console.log("updateBlocks", { updates });

        // TODO: Criar um lógica de segurança, mover os blocos antes de submeter os dados e alterar os estado
        // em caso de sucesso disparar mensagem e em caso de erro entender melhor fluxo para retornar
        // o estado da aplicação.
        dispatch({ type: "updateBlocks", blocks: reindexedBlocks });
        client.mutation(updateBlocksGql, { updates })
            .toPromise()
            .then((result) => {
                // console.log(result);
                // Confirmar se de fato essa é a nova chamada de atualização do estado.
                dispatch({ type: "updateBlocks", blocks: result.data?.update_blocks_many.map((obj: any) => obj.returning[0]) });
                toast.success("Bloco movido com sucesso.");
            }).catch((err) => {
                console.error("moveBlock ->> GraphQL:", err);
            })
    }

    const updatePlugin = useCallback(({ id, __typename, ...updatedFields }: PagePlugin) => {
        // TODO: update on GraphQL API
        const client = createCSRClient();
        client.mutation(updateWidgetGql, {
            id: id,
            updated_fields: updatedFields
        })
            .toPromise()
            .then((result) => {
                dispatch({ type: "updatePlugin", plugin: result.data?.update_widgets_by_pk });
                toast.success("Plugin atualizado com sucesso.")
            }).catch((err) => {
                console.error("updatePlugin ->> GraphQL:", err);
            })
    }, [dispatch]);

    if (state?.loading) return <p>Carregando campanha</p>;
    if (state?.error) return <p>error: {state.error}</p>

    return (
        <PageContext.Provider
            value={{
                meta: state.meta,
                blocks: state.blocks,
                updateBlock: updateBlock,
                moveBlock: moveBlock,
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
                updatePlugin: () => { },
                updateBlock: () => { },
                moveBlock: () => { },
            } as any}
        >
            {children}
        </PageContext.Provider>
    );
}