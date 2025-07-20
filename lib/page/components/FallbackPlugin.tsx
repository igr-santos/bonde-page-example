import React from "react";

export default function FallbackPlugin({ kind }: { kind: string }) {
    return (
        <div className="text-red-500">
            <p>{`Plugin ${kind} não encontrado.`}</p>
        </div>
    );
}