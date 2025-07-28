import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';
import type { JSONSchema7 } from "json-schema";
import { useTranslations } from 'next-intl';

import { PagePlugin } from "@/lib/page/types";
// import { useDashboard } from "@/components/Dashboard";
import { useEditable } from "../../hooks";
import { EditFieldsFormPlugin, ErrorListTemplate } from "./components";
import { toJsonSchema } from "./parse";


export default function FormPlugin({ id, settings }: PagePlugin) {
    const t = useTranslations('Plugin');
    const editable = useEditable();
    // const { open } = useDashboard();
    const { title, description, submitLabel, fields } = settings || {};
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

    const transformErrors = (errors: any[]) =>
        errors.map((error) => {
            // console.log("error", { error });
            if (error.name === 'format' && error.params?.format === 'email') {
                error.message = t('Form.emailFormat');
            } else if (error.name === "required") {
                error.message = t('Form.required');
            }
            return error;
        });

    return (
        <div className="p-8">
            <Form
                schema={{ title, description, ...schema }}
                uiSchema={uiSchema}
                validator={validator}
                templates={{
                    ErrorListTemplate
                }}
                transformErrors={transformErrors}
                noHtml5Validate
            >
                <div className="flex flex-col gap-2">
                    <input className="bg-black hover:bg-black/80 cursor-pointer text-white py-2" type="submit" value={submitLabel || t('Form.submitLabel')} />
                    {editable && <EditFieldsFormPlugin pluginId={id} />}
                </div>
            </Form>
        </div>
    );
}