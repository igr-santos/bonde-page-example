import { headers } from "next/headers";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { createSSRClient } from "@/lib/graphql/client";
import { getHostFromHeaders } from '@/lib/graphql/getHost';
import { getMobilizationByFilter, getMetadataByFilter } from "@/lib/graphql/queries";
import type { MobilizationByFilterData } from "@/lib/graphql/types";
import { Page } from "@/lib/page";
import { PageServerProvider } from "@/lib/page/provider";
import { transformBondeResponseToPage } from "@/lib/page/utils";

export async function generateMetadata(
    props: any,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const host = getHostFromHeaders(await headers());
    const { client } = createSSRClient(host);

    const result = await client.query(
        getMetadataByFilter,
        {
            filter: host.includes(".bonde.devel")
                ? { slug: { _eq: host.replace(".bonde.devel", "") } }
                : { custom_domain: { _eq: `www.${host.replace("www", "")}` } }
        }
    )

    const {
        name: title,
        facebook_share_title,
        facebook_share_description,
        facebook_share_image,
        twitter_share_text,
        favicon
    } = result.data?.mobilizations[0];

    return {
        //
        metadataBase: new URL("http://localhost:3000"),
        title,
        description: facebook_share_description,
        icons: {
            icon: favicon,
        },
        openGraph: {
            title: facebook_share_title,
            description: facebook_share_description,
            images: [
                {
                    url: facebook_share_image
                }
            ],
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: twitter_share_text,
            images: [facebook_share_image]
        }
    }
}

export default async function Home() {
    const host = getHostFromHeaders(await headers());
    const { client } = createSSRClient(host);

    const result = await client.query<MobilizationByFilterData>(
        getMobilizationByFilter,
        {
            filter: host.includes(".bonde.devel")
                ? { slug: { _eq: host.replace(".bonde.devel", "") } }
                : { custom_domain: { _eq: `www.${host.replace("www", "")}` } }
        }
    )

    if (result.data?.mobilizations.length != 1) {
        notFound();
    }

    const pageData = transformBondeResponseToPage(result);

    return (
        <PageServerProvider data={pageData}>
            <Page />
        </PageServerProvider>
    );
}
