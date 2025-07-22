import React from "react";
import { useDashboard } from "@/components/Dashboard";
import { useBlock, useEditable } from "../hooks";
import Plugin from "./Plugin";
import BlockEditable from "./BlockEditable";

// TODO: Encapsular o bloco com ferramenta de edição useDashboard
function Block({ id }: { id: number; }) {
    // const { open } = useDashboard();
    const editable = useEditable();
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

    // Customizando estilos do Bloco
    const styles: any = {};
    if (block.bg_class) {
        styles.backgroundColor = block.bg_class
    }

    const renderBlock = (
        <div
            id={`block-${block.id}`}
            style={styles}
            className={`py-18`}
        >
            <div className={`container mx-auto
                ${blockLayout[block.layout]}
            `}>
                {block.plugins.map(pluginId => (
                    <Plugin key={`plugin-${pluginId}`} id={pluginId} />
                ))}
            </div>
        </div>
    )

    if (editable) {
        return (
            <BlockEditable block={block}>
                {renderBlock}
            </BlockEditable>
        )
    }

    return renderBlock;
}

export default React.memo(Block);