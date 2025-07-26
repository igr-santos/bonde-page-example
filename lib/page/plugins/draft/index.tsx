"use client";
import { useTranslations } from 'next-intl';
import type { PagePlugin } from "@/lib/page/types";

import { ContentIcon, FormIcon, EmailIcon, PhoneIcon } from './icons';


function DraftButton({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button
            type="button"
            title={label}
            className="flex flex-col gap-2 p-4 items-center border border-gray-400 cursor-pointer"
        >
            {icon}
        </button>
    )
}


export default function DraftPlugin(props: PagePlugin) {
    const t = useTranslations("Plugin");
    
    return (
        <div className="w-full h-full flex p-12 items-center justify-center bg-black/20 border border-gray-400">
            <div className="flex flex-wrap gap-4 items-center justify-center w-1/2">
                <DraftButton icon={<ContentIcon className="w-8 h-8" />} label={t("content")} />
                <DraftButton icon={<EmailIcon className="w-8 h-8" />} label={t("emailPressure")} />
                <DraftButton icon={<FormIcon className="w-8 h-8" />} label={t("form")} />
                <DraftButton icon={<PhoneIcon className="w-8 h-8" />} label={t("phonePressure")} />
            </div>
        </div>
    );
}