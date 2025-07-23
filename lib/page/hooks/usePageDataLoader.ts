"use client";
import { useEffect, useReducer, useRef } from "react";
import { useRouter, notFound } from "next/navigation";
import { toast } from "sonner";
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
    const router = useRouter();

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
                // console.log("usePageDataLoader ->> result ->>", result);
                
                // ⛔ Se o resultado for vazio ou sem autorização, redireciona
                if (!result.data || result.data.mobilizations.length === 0) {
                    // Limpa o site que foi utilizado para seleção
                    localStorage.removeItem("editor:site");

                    toast.error("Página não encontrada", { description: "Você não possui permissão para editar ou essa página não existe." });
                    router.replace("/admin"); // redireciona sem manter no histórico

                    return;
                }

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