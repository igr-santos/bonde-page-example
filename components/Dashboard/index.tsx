"use client";
import React, { Suspense, lazy } from "react";
import { useTranslations } from 'next-intl';
import { useAuth } from "@/lib/auth";
import { createContext, useContext, useState, ReactNode } from "react";
import Fallback from "./Fallback";

interface DashboardContextValue {
    isOpen: boolean;
    open: (component: string, id: number) => void;
    close: () => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

export default function DashboardProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [render, setRender] = useState<{ component: string, id: number } | null>(null);
    const { keycloak } = useAuth();
    const t = useTranslations("Dashboard");

    const open = (component: string, id: number) => {
        setRender({ component, id });
        setIsOpen(true);
    }
    const close = () => {
        setRender(null);
        setIsOpen(false)
    };

    const LazyComponent: any = render
        ? lazy(() => import(`./forms/${render.component}`))
        : null;

    return (
        <DashboardContext.Provider value={{ isOpen, open, close }}>
            <div className="bg-black text-white px-5 fixed top-0 w-full z-3 h-12 max-h-12 flex justify-between items-center">
                <p><strong>B</strong>ONDE</p>
                <button className="cursor-pointer hover:underline" type="button" onClick={() => keycloak.logout()}>{t("logout")}</button>
            </div>
            <div className="h-12" />
            {children}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40"
                        onClick={close}
                    />
                    {/* Drawer */}
                    <div className="fixed top-0 left-0 w-full max-w-lg h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out">
                        <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold">Editar</h2>
                        <button onClick={close}>Fechar</button>
                        </div>
                        <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                            <Suspense fallback={<Fallback />}>
                                <LazyComponent id={render?.id} />
                            </Suspense>
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