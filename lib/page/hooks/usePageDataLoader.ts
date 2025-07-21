"use client";
import { useEffect, useReducer } from "react";
import { createCSRClient } from "@/lib/graphql/client";
import { getMobilizationByFilter } from "@/lib/graphql/queries";
import { reducer, initialState } from "../provider/pageReducer";
import { transformBondeResponseToPage } from "../utils";


type UsePageDataLoaderFilter = {
    slug?: { _eq: string };
    custom_domain?: { _eq: string };
}

// TODO: Tipar o state
export default function usePageDataLoader(filter: UsePageDataLoaderFilter) {
    const [state, dispatch] = useReducer(reducer, { ...initialState, editable: true });

    useEffect(() => {
        // Busca os dados de acordo com o filtro no GraphQL
        // serve apenas para client-side, server-side são feitos
        // diretamente no componente anterior e seus resultados
        // são passados para esse hook através do initialData.
        const client = createCSRClient();

        dispatch({ type: "fetching" });
        client
            .query(getMobilizationByFilter, { filter })
            .toPromise()
            .then((result) => {
                const pageData = transformBondeResponseToPage(result)
                dispatch({ type: "success", ...pageData });
            })
            .catch((err) => {
                console.log("->> ERROR usePageDataLoader <<-");
                console.error(err);
                dispatch({ type: "error", error: err });
            });
    }, []);

    return { state, dispatch };
}