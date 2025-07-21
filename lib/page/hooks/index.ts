import { useContextSelector } from "use-context-selector";
import { PageContext } from "../provider";

export const usePlugins = (block_id: number) =>
    useContextSelector(PageContext, ctx =>
        ctx!.plugins.filter(p => p.block_id === block_id)
    );

export const usePlugin = (id: number) =>
    useContextSelector(PageContext, ctx =>
        ctx!.plugins.find(p => p.id === id)
    );

export const useUpdatePlugin = () => useContextSelector(PageContext, ctx => ctx!.updatePlugin);

export const useBlocks = () =>
    useContextSelector(PageContext, ctx => ctx!.blocks);

export const useBlock = (id: number) =>
    useContextSelector(PageContext, ctx =>
        ctx!.blocks.find(p => p.id === id)
    );

export const useUpdateBlock = () => useContextSelector(PageContext, ctx => ctx!.updateBlock);

export const useEditable = () => useContextSelector(PageContext, ctx => ctx!.editable);

export { default as usePageDataLoader } from "./usePageDataLoader";