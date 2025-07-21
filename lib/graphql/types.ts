export type Mobilization = {
    id: number;
    name: string;
    google_analytics_code?: string;
    facebook_share_title?: string;
    facebook_share_description?: string;
    facebook_share_image?: string;
    color_scheme?: string;
    header_font?: string;
    body_font?: string;
}

export type Block = {
    id: number;
    menu_hidden: boolean;
    hidden: boolean;
    bg_class?: string;
    bg_image?: string;
    name: string;
    position?: number;
    mobilization_id: number;
    plugins: { id: number }[]
}

export type Plugin = {
    id: number;
    kind: string;
    settings: any;
    block_id: number;
    sm_size: string;
    md_size: string;
    lg_size: string;
}

export type MobilizationByFilterData = {
    mobilizations: Mobilization[];
    blocks: Block[];
    plugins: Plugin[];
}