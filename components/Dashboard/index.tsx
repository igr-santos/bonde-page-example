// DashboardContext.tsx
"use client";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export default function DashboardProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <DashboardContext.Provider value={{ isOpen, open, close, toggle }}>
            {children}
            {isOpen && (
                <>
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={close}
                />
                {/* Drawer */}
                <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out">
                    <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Editar</h2>
                    <button onClick={close}>Fechar</button>
                    </div>
                    <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                        <p className="text-2xl">Aqui vai vir o conteúdo</p>
                    </div>
                </div>
                </>
            )}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
}