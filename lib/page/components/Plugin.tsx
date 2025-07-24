// "use client";
import React from "react";
import { usePlugin } from "../hooks";
import PluginFallback from "./PluginFallback";
import Content from "../plugins/content";
import Draft from "../plugins/draft";

export const installedPlugins: any = {
    content: Content,
    draft: Draft
}


function Plugin({ id }: { id: number }) {
    const plugin = usePlugin(id);

    if (!plugin) return <>Plugin não encontrado!</>;

    const Component = installedPlugins[plugin.kind] || (() => <PluginFallback kind={plugin.kind} />);

    return (
        <div className="p-2 min-h-30">
            <Component {...plugin} />
        </div>
    )
}

export default React.memo(Plugin);