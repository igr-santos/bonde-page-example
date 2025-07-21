"use client";
import React from "react";
import { useBlocks } from "../hooks";
import Block from "./Block";


function Content() {
    const blocks = useBlocks();

    return (
        <main className="flex-1 overflow-auto">

            {blocks.map(({ id }) => <Block key={`block-${id}`} id={id} />)}
        </main>
    )
}

export default React.memo(Content);