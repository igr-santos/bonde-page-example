import React from "react";
import { useEditable } from "../hooks";

export default function FallbackPlugin({ kind }: { kind: string }) {
    const editable = useEditable();

    if (editable) {
        return (
            <div className="text-red-500">
                <p>{`Plugin ${kind} não encontrado.`}</p>
            </div>
        );
    }

    return <></>
}