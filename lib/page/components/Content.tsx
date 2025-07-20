"use client";
import React from "react";
import { usePageContext } from "../context/PageProvider";
import Block from "./Block";


export default function Content() {
    const { blocks } = usePageContext();

    return (
        <main className="flex-1 overflow-auto px-6 md:px-0 py-8">
            <div className="container mx-auto">
                {blocks.map(block => <Block key={block.id} block={block} />)}
            </div>
        </main>
    )
}