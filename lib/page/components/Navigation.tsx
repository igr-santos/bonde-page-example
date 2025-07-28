"use client";
import React from "react";
import { useBlocks, useEditable } from "../hooks";
import { PageBlock } from "../types";

function Navbar() {
    const editable = useEditable();
    const blocks = useBlocks();

    const renderMenu = (block: PageBlock) => (
        <a key={block.id} href={`#block-${block.id}`}>{block.name}</a>
    )

    return (
        <header className={`bg-black/60 text-white py-5 px-5 md:px-0 fixed w-full z-2
                ${editable ? "top-12" : "top-0"}
            `}>
            <nav className="container mx-auto flex items-center justify-center gap-4 font-bold">
                {editable ? blocks.map(renderMenu) : blocks.filter(b => !b.hidden && !b.menu_hidden).map(renderMenu)}
            </nav>
        </header>
    )
}

export default React.memo(Navbar);