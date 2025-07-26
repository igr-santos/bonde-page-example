// "use client";
import React from "react";
import { usePlugin } from "../hooks";
import PluginFallback from "./PluginFallback";
import ContentPlugin from "@/lib/page/plugins/content";
import DraftPlugin from "@/lib/page/plugins/draft";
import FormPlugin from "@/lib/page/plugins/form";
import EmailPressurePlugin from "@/lib/page/plugins/pressure";
import PhonePressurePlugin from "@/lib/page/plugins/phone";

export const installedPlugins: any = {
    content: ContentPlugin,
    draft: DraftPlugin,
    form: FormPlugin,
    pressure: EmailPressurePlugin,
    phone: PhonePressurePlugin
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