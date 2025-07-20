import React from "react";
import { slateToHtml } from 'slate-serializers';
import { usePageContext } from "@/lib/page/context/PageProvider";
import type { PagePlugin } from "@/lib/page/types";
import HTMLEditor from "./HTMLEditor";

// TODO: Documentar Conteúdo
export default function ContentPlugin({ id, settings, ...plugin }: PagePlugin) {
    const { updatePlugin } = usePageContext();

    return (
        <HTMLEditor
            id={`content-${id}`}
            initialValue={settings.content}
            onBlur={(newContent) => {
                updatePlugin({ id, settings: {...settings, content: newContent}, ...plugin });
            }}
        />
    )
}