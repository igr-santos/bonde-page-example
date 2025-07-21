import React from "react";
import { useEditable } from "../hooks";

export default function FallbackPlugin({ kind }: { kind?: string }) {
    const editable = useEditable();

    if (editable) {
        return (
            <div className="text-red-500">
                <p>{kind ? `Renderização do Plugin<${kind}> não existe.` : 'Plugin não encontrado'}</p>
            </div>
        );
    }

    return <></>
}