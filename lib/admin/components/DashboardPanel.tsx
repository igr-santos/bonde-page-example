import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { usePanel } from "../DashboardContext";
import ArrayFieldItemTemplate from "./ArrayFieldItemTemplate";
import ArrayFieldItemButtonsTemplate from "./ArrayFieldItemButtonsTemplate";


export default function DashboardPanel({ panelId }: { panelId: string }) {
    const { schema, uiSchema, formData, onChange, onSubmit } = usePanel(panelId);

    return (
        <div className="dashboard-panel">
            <Form
                validator={validator}
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={({ formData }) => onChange(formData)}
                onSubmit={({ formData }) => onSubmit(formData)}
                templates={{
                    ArrayFieldItemTemplate,
                    ArrayFieldItemButtonsTemplate
                }}
            />
        </div>
    );
}