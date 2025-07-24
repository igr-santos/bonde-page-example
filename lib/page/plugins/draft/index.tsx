"use client";
import { useTranslations } from 'next-intl';
import type { PagePlugin } from "@/lib/page/types";


// const installedPlugins = {
//     "content": {
//         "draft": 
//     }
// }


export default function DraftPlugin(props: PagePlugin) {
    const t = useTranslations("Page");
    
    return (
        <div>
            <button type="button">{t("contentPlugin")}</button>
        </div>
    );
}