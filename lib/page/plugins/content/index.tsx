"use client";
import React, { Suspense, lazy } from "react";
import { PluginSkeleton } from "@/lib/page/components";
import { useUpdatePlugin, useEditable } from "@/lib/page/hooks";
import type { PagePlugin } from "@/lib/page/types";

// Carregamento Lazy para evitar problemas no SSR
const HTMLEditor = lazy(() => import("./HTMLEditor"));

// TODO: Documentar Conteúdo
function ContentPlugin({ id, settings, ...plugin }: PagePlugin) {
    const editable = useEditable();
    const updatePlugin = useUpdatePlugin();

    if (editable) {        
        return (
            <Suspense fallback={<PluginSkeleton />}>
                <HTMLEditor
                    id={`content-${id}`}
                    initialValue={settings.content}
                    onBlur={(newContent: string) => {
                        if (settings.content !== newContent) {
                            // Garante que o método de atualização do Plugin só sera invocado
                            // quando realmente houver necessidade, evitando re-renders da estrutura.
                            updatePlugin({ id, settings: {...settings, content: newContent}, ...plugin });
                        }
                    }}
                />
            </Suspense>
        )
    }

    return <div dangerouslySetInnerHTML={{ __html: settings.content }} />;
}

export default React.memo(ContentPlugin);