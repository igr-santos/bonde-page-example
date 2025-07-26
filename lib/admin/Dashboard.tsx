// components/Dashboard.tsx
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { useDashboard } from "./DashboardContext";

export function Dashboard() {
    const { state, dispatch, getAction } = useDashboard() || {
        state: {},
        dispatch: () => {},
        getAction: () => {}
    } as any;

    const panelId = state.activePanel;
    const schema = panelId ? state.schemas[panelId] : null;
    const uiSchema = panelId ? state.uiSchemas[panelId] : null;
    const formData = panelId ? state.formData[panelId] : undefined;

    if (!panelId || !schema) return <div>Selecione um painel.</div>;

    return (
        <div className="p-4 border">
            <h2>{schema.title}</h2>
            <Form
                validator={validator}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={({ formData }) =>
                    dispatch({ type: "UPDATE_FORM_DATA", panelId, data: formData })
                }
                onSubmit={({ formData }) => {
                    const action = getAction(panelId);
                    if (action) {
                        action(formData);
                    } else {
                        console.warn(`Sem ação registrada para o painel "${panelId}"`);
                    }
                }}
            />
        </div>
    );
}
