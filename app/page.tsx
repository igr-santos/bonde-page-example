import { headers } from "next/headers";
import type { Metadata, ResolvingMetadata } from "next";
import { createSSRClient } from "@/lib/graphql/client";
import { getHostFromHeaders } from '@/lib/graphql/getHost';
import { getMobilizationByFilter, getMetadataByFilter } from "@/lib/graphql/queries";
import type { MobilizationByFilterData } from "@/lib/graphql/types";
import { Page } from "@/lib/page";
import { PageServerProvider } from "@/lib/page/provider";
import type { PageMeta, PageBlock, PageTheme, PagePlugin } from "@/lib/page/types/page";
import { transformBondeResponseToPage } from "@/lib/page/utils";

export async function generateMetadata(
  props: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const host = getHostFromHeaders(await headers());
  const { client } = createSSRClient(host);

  const result = await client.query(
    getMetadataByFilter,
    { filter: { slug: { _eq: "testes-de-widgets" } } }
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
    { filter: { slug: { _eq: "testes-de-widgets" } } }
  )

  if (result.data?.mobilizations.length != 1) {
    throw Error("PageError")
  }

  const pageData = transformBondeResponseToPage(result);

  return (
    <PageServerProvider data={pageData}>
      <Page />
    </PageServerProvider>
  );
}
