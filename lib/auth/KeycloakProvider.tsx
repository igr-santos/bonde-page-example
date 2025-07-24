'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import keycloak from './keycloak';

type AuthContextType = {
    keycloak: typeof keycloak;
    initialized: boolean;
    authenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)!;

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        keycloak
            .init({ onLoad: 'login-required', checkLoginIframe: false })
            .then((auth) => {
                setAuthenticated(auth);
                setInitialized(true);
            })
            .catch((err) => {
                console.error("Keycloak init error", err);
            });
    }, []);

    if (!initialized) return <div>Carregando Keycloak...</div>;

    // console.log(keycloak.token, keycloak.refreshToken, keycloak.authenticated);
    return (
        <AuthContext.Provider value={{ keycloak, initialized, authenticated }}>
            {children}
        </AuthContext.Provider>
    );
}