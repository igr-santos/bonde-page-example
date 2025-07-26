import { useEffect } from "react";
import { useDashboard } from "./DashboardContext";

export function SchemaLoader() {
    const { dispatch, registerAction } = useDashboard() || {
        dispatch: () => {},
        registerAction: () => {}
    };

    useEffect(() => {
        const panelId = "userForm";

        dispatch({
            type: "SET_SCHEMA",
            panelId,
            schema: {
                title: "Editar Usuário",
                type: "object",
                properties: {
                    name: { type: "string", title: "Nome" },
                    email: { type: "string", title: "Email" },
                },
            },
            uiSchema: {
                email: { "ui:widget": "email" },
            },
        });

        registerAction(panelId, (data) => {
            console.log("🚀 Enviando dados do formulário userForm:", data);
            // Aqui você chamaria uma mutation, fetch, etc.
        });
    }, [dispatch, registerAction]);

    return null;
}
