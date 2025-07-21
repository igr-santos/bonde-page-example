// "use client";
import React, { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
import type { PagePlugin } from "../types/page";
import { usePlugin, useEditable } from "../hooks";
import PluginSkeleton from "./PluginSkeleton";
import PluginFallback from "./PluginFallback";
import Content from "../plugins/content";

export const plugins: any = {
    content: Content,
}


function DynamicPluginLoader(props: PagePlugin) {
    // const editable = useEditable();
    // const pluginSrc: string = `../plugins/${props.kind}/index`;

    // if (editable) {
    //     const LazyComponent = lazy(() => import(pluginSrc).catch(() => import('./PluginFallback')));

    //     return (
    //         <Suspense fallback={<PluginSkeleton />}>
    //             <LazyComponent {...props} />
    //         </Suspense>
    //     );
    // }

    // const Component = dynamic<PagePlugin>(() => import(pluginSrc).catch(() => import('./PluginFallback')), { ssr: false });

    // return (
    //     <Component {...props} />
    // );

}


function Plugin({ id }: { id: number }) {
    const plugin = usePlugin(id);

    if (!plugin) return <>Plugin não encontrado!</>;

    const Component = plugins[plugin.kind] || (() => <PluginFallback kind={plugin.kind} />);

    return (
        <div className="p-2 min-h-30">
            <Component {...plugin} />
            {/* <DynamicPluginLoader {...plugin} /> */}
        </div>
    )
}

export default React.memo(Plugin);