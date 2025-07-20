"use client";
import React from "react";
import { useAuth } from "@/lib/auth";
import { useDashboard } from "./Context";


export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isOpen, close, open } = useDashboard();
    const { keycloak } = useAuth()

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-40 h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:static md:block`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Editor</h2>
                    <button className="md:hidden" onClick={close}>
                        Fechar
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">Página inicial</a>
                    <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">Editor</a>
                    <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">Configurações</a>
                    <a href="#" onClick={() => keycloak.logout()} className="cursor-pointer block px-2 py-1 rounded hover:bg-gray-100">Sair</a>
                </nav>
            </div>

            {/* Overlay para mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={close}></div>
            )}
            {/* Conteúdo principal */}
            <div className="flex-1 overflow-y-auto">
                {/* Topbar mobile */}
                <div className="md:hidden shadow bg-white flex items-center justify-between">
                    <button onClick={open}>Menu</button>
                    <h1 className="text-xl font-bold">Editor</h1>
                </div>

                <main>{children}</main>
            </div>
        </div>
    )
}

export { useDashboard } from "./Context";
export { DashboardProvider } from "./Context";