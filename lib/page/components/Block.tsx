import React from "react";
import { useDashboard } from "@/components/Dashboard";
import { useBlock } from "../hooks";
import Plugin from "./Plugin";

// TODO: Encapsular o bloco com ferramenta de edição useDashboard
function Block({ id }: { id: number; }) {
    // const { open } = useDashboard();
    const block = useBlock(id);

    if (!block) return <>Bloco não encontrado!</>;

    // TODO
    // - Alterar esse comportamento para usar uma tipagem mais adequada.
    // - Considerar a possibilidade de diferentes formatos de bloco.
    const blockLayout: any = {
        '1': "grid grid-cols-1 gap-4",
        '2': "grid grid-cols-1 md:grid-cols-2 gap-4",
        '3': "grid grid-cols-1 md:grid-cols-3 gap-4",
        '4': "grid grid-cols-1 md:grid-cols-4 gap-4",
    }

    return (
        <div>
            <div id={`block-${block.id}`} className={`${blockLayout[block.layout]}`}>
                {block.plugins.map(pluginId => (
                    <Plugin key={`plugin-${pluginId}`} id={pluginId} />
                ))}
            </div>
            {/* <button type="button" onClick={open}>Abrir Drawer</button> */}
        </div>
    )
}

export default React.memo(Block);