import { PageData } from "./types/page";

function rgbaToHex({ r, g, b, a = 1 }: any) {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    const alpha = Math.round(a * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? toHex(alpha) : ''}`;
}


export function transformBondeResponseToPage (result: any): PageData {
    const { name: title, facebook_share_description: description } = result.data?.mobilizations[0];

    return {
        meta: { title, description },
        blocks: result.data?.blocks.map((block: any) => {
            const plugins = block.plugins.map(({ id }: any) => id);
            return {
                ...block,
                bg_class: block?.bg_class
                    ? !block?.bg_class.startsWith("#")
                        ? rgbaToHex(JSON.parse(block?.bg_class)) : block?.bg_class
                    : null,
                layout: String(plugins.length),
                plugins
            }
        }),
        plugins: result.data?.plugins,
        theme: {}
    }
}