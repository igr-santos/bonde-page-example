export interface PageMeta {
    title: string;
    description: string;
    openGraphImage?: string;
    canonicalUrl?: string;
}

export interface PagePlugin {
    id: number;
    kind: string;
    settings?: any;
    block_id: number;
}

export interface PageBlock {
    id: number;
    layout: string;
    name: string;
    plugins: number[];
}

export interface PageTheme {
    headerFont?: string;
    bodyFont?: string;
    colorScheme?: string;
}

export interface PageData {
    meta: PageMeta;
    blocks: PageBlock[];
    plugins: PagePlugin[];
    theme: PageTheme;
}