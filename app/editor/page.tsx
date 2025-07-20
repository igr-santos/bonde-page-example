'use client';
import React, { useReducer, useEffect } from "react";
import { createCSRClient } from "@/lib/graphql/client";
import { getHostFromWindow } from '@/lib/graphql/getHost';
import { getMobilizationByFilter } from "@/lib/graphql/queries";
import { PageProvider, Page } from "@/lib/page";
import Dashboard from "@/components/Dashboard";

const initialState = {
  // O atributo `loading` garante que aguardaremos a requisição
  // GraphQL acontecer antes de renderizar o Provider.
  loading: true,
  meta: undefined,
  blocks: undefined,
  theme: undefined,
  error: undefined
}

function reducer(state: any, action: any) {
  if (action.type === "success") {
    return {
      loading: false,
      meta: action.meta,
      blocks: action.blocks,
      theme: action.theme,
      error: undefined
    }
  } else if (action.type === "fetching") {
    return {
      loading: true,
      meta: undefined,
      blocks: undefined,
      theme: undefined,
      error: undefined
    }
  } else if (action.type === "error") {
    return {
      loading: false,
      error: action.error,
      meta: undefined,
      blocks: undefined,
      theme: undefined
    }
  }
}

export default function Editor() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const client = createCSRClient();

    useEffect(() => {
        const host = getHostFromWindow();
        dispatch({ type: "fetching" });
        client
            .query(getMobilizationByFilter, { filter: { slug: { _eq: "testes-de-widgets" } } })
            .toPromise()
            .then((result) => {
                const { name: title, facebook_share_description: description } = result.data?.mobilizations[0];

                dispatch({
                    type: "success",
                    meta: { title, description },
                    blocks: result.data?.blocks.map((block: any) => {
                      const plugins = result.data?.widgets.filter((widget: any) => widget.block_id === block.id).map((widget: any) => ({
                        id: widget.id,
                        kind: widget.kind,
                        settings: widget.settings
                      }));

                      return {
                        id: block.id,
                        name: block.name,
                        layout: String(plugins?.length),
                        plugins: plugins || []
                      }
                    }),
                    theme: {}
                });
            });
    }, []);

    if (state?.loading) return <p>Carregando campanha</p>;
    if (state?.error) return <p>error: {state.error}</p>

    return (
      <PageProvider data={{ meta: state?.meta, blocks: state?.blocks, theme: state?.theme }}>
        <Dashboard>
          <Page />
        </Dashboard>
      </PageProvider>
    );
}
