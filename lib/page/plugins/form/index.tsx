import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';
import type { JSONSchema7 } from "json-schema";

import { PagePlugin } from "@/lib/page/types";
// import { useDashboard } from "@/components/Dashboard";
import { useEditable } from "../../hooks";
import { EditFieldsFormPlugin } from "./components";
import { toJsonSchema } from "./parse";


export default function FormPlugin({ id, settings }: PagePlugin) {
    const editable = useEditable();
    // const { open } = useDashboard();
    const { fields } = settings || {};
    let schema: JSONSchema7 = fields.schema;
    let uiSchema: JSONSchema7 = fields.uiSchema;

    if (typeof fields === "string") {
        schema = toJsonSchema(
            JSON.parse(fields).map((field: any) => ({
                ...field,
                required: field.required === 'true'
            })
        ));
    }

    return (
        <div className="p-8">
            <Form schema={schema} uiSchema={uiSchema} validator={validator} />
            {editable && (
                <EditFieldsFormPlugin pluginId={id} />
            )}
        </div>
    );
}