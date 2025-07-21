"use client";
import React from "react";
import { useBlocks } from "../hooks";
import Block from "./Block";


function Content() {
    const blocks = useBlocks();

    return (
        <main className="flex-1 overflow-auto px-6 md:px-0 py-8">
            <div className="container mx-auto">
                {blocks.map(({ id }) => <Block key={`block-${id}`} id={id} />)}
            </div>
        </main>
    )
}

export default React.memo(Content);