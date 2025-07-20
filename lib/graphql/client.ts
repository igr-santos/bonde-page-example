import { cacheExchange, fetchExchange, ssrExchange, createClient } from "urql";
import { authExchange } from '@urql/exchange-auth';
import { keycloak } from "@/lib/auth";


const GRAPHQL_API_URL = "https://api-graphql.bonde.devel/v1/graphql";

export function createSSRClient(host: string) {
    const ssr = ssrExchange({ isClient: false });

    return {
        client: createClient({
            url: GRAPHQL_API_URL,
            exchanges: [cacheExchange, ssr, fetchExchange],
            fetchOptions: {
                headers: {
                    host,
                }
            }
        })
    }
}


export function createCSRClient() {
    return createClient({
        url: GRAPHQL_API_URL,
        exchanges: [
            cacheExchange,
            authExchange(async utils => {
                // try {
                //     // Tenta renovar o token se estiver perto de expirar
                //     await keycloak.updateToken(30); // 30 segundos de validade mínima
                // } catch (error) {
                //     console.error("Erro ao atualizar token:", error);
                //     // Você pode forçar logout ou mostrar uma mensagem, se necessário
                // }

                const token = keycloak.token;

                // console.log("authExchange", token);
                return {
                    addAuthToOperation(operation) {
                        if (!token) return operation;
                        
                        // console.log("addAuthToOperation", operation);
                        return utils.appendHeaders(operation, {
                            Authorization: `Bearer ${token}`
                        })
                    },
                    didAuthError(error, _operation) {
                        // TODO: Testar a necessidade de refresh token
                        console.log(_operation, error);
                        return error.graphQLErrors.some(e => e.extensions?.code === 'FORBIDDEN');
                    },
                }
            }),
            fetchExchange
        ],
        fetchOptions: {
            headers: {
                host: typeof window !== "undefined" ? window.location.host : "",
            },
        },
    });
}