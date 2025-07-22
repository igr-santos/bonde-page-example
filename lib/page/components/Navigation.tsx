"use client";
import React from "react";
import { useBlocks, useEditable } from "../hooks";

function Navbar() {
    const editable = useEditable();
    const blocks = useBlocks();

    return (
        <header className={`bg-black/60 text-white py-5 px-5 md:px-0 fixed w-full z-2
                ${editable ? "top-12" : "top-0"}
            `}>
            <nav className="container mx-auto flex items-center justify-center gap-4 font-bold">
                {blocks.map(block => (
                    <a key={block.id} href={`#block-${block.id}`}>{block.name}</a>
                ))}
            </nav>
        </header>
    )
}

export default React.memo(Navbar);