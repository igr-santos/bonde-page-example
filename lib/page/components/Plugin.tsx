"use client";
import React, { Suspense, lazy } from "react";
import { usePageContext } from "../context/PageProvider";
import type { PagePlugin } from "../types/page";


function DynamicPluginLoader(props: PagePlugin) {
    const LazyComponent = lazy(() =>
        import(`../plugins/${props.kind}/index`).catch(() => import('./FallbackPlugin'))
    );

    return (
        <Suspense fallback={<div>Carregando plugin...</div>}>
            <LazyComponent {...props} />
        </Suspense>
    );
}


export default function Plugin({
    plugin
}: { plugin: PagePlugin }) {
    return (
        <div className="p-2 min-h-30">
            <DynamicPluginLoader {...plugin} />
        </div>
    )
}