"use client";
import React from "react";
import { usePageContext } from "../context/PageProvider";

export default function Navbar() {
    const { blocks } = usePageContext();

    return (
        <>
        <header className="bg-black/60 text-white py-5 px-5 md:px-0 fixed top-0 w-full z-2">
            <nav className="container mx-auto flex items-center justify-center gap-4 font-bold">
                {blocks.map(block => (
                    <a key={block.id} href={`#block-${block.id}`}>{block.name}</a>
                ))}
            </nav>
        </header>
        <div className="h-16" />
        </>
    )
}