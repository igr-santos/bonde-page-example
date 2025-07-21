import React from "react";
import dynamic from "next/dynamic";
import { useUpdatePlugin, useEditable } from "@/lib/page/hooks";
import type { PagePlugin } from "@/lib/page/types";

// TODO: Documentar Conteúdo
export default function ContentPlugin({ id, settings, ...plugin }: PagePlugin) {
    const updatePlugin = useUpdatePlugin();
    const editable = useEditable();

    if (editable) {
        const HTMLEditor = dynamic(() => import("./HTMLEditor"), { ssr: false });
        
        return (
            <HTMLEditor
                id={`content-${id}`}
                initialValue={settings.content}
                onBlur={(newContent: string) => {
                    updatePlugin({ id, settings: {...settings, content: newContent}, ...plugin });
                }}
            />
        )
    }

    return <div dangerouslySetInnerHTML={{ __html: settings.content }} />;
}