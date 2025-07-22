import type { PageBlock, PagePlugin } from "../types"

export const initialState = {
    // O atributo `loading` garante que aguardaremos a requisição
    // GraphQL acontecer antes de renderizar o Provider.
    loading: true,
    editable: false,
    meta: undefined,
    blocks: [],
    plugins: [],
    theme: undefined,
    error: undefined
}

// TODO: Tipagem no reducer
export function reducer(state: any, action: any) {
    if (action.type === "success") {
        return {
            ...state,
            loading: false,
            meta: action.meta,
            blocks: action.blocks,
            plugins: action.plugins,
            theme: action.theme,
            error: undefined
        }
    } else if (action.type === "fetching") {
        return {
            ...state,
            loading: true,
            meta: undefined,
            blocks: undefined,
            plugins: undefined,
            theme: undefined,
            error: undefined
        }
    } else if (action.type === "error") {
        return {
            ...state,
            loading: false,
            error: action.error,
            meta: undefined,
            blocks: undefined,
            plugins: undefined,
            theme: undefined
        }
    } else if (action.type === "updateBlock") {
        return {
            ...state,
            blocks: state.blocks.map((b: PageBlock) =>
                b.id === action.block.id ? {
                    ...b,
                    ...action.block
                } : b
            )
        }
    } else if (action.type === "updateBlocks") {
        const blocks = state.blocks.map((block: PageBlock) => {
            const newBlock = action.blocks.find((b: PageBlock) => b.id === block.id)
            if (newBlock) {
                return {
                    ...block,
                    ...newBlock
                }
            };
            return block;
        })
        return {
            ...state,
            blocks: blocks.sort((a: PageBlock, b: PageBlock) => a.position - b.position)
        }
    } else if (action.type === "updatePlugin") {
        return {
            ...state,
            plugins: state.plugins.map((p: PagePlugin) =>
                p.id === action.plugin.id ? action.plugin : p
            )
        }
    }
}