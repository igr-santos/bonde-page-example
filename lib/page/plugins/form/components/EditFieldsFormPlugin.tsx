import { usePanelController, useRegister } from "@/lib/admin"
import { usePlugin, useUpdatePlugin } from "@/lib/page/hooks";
import { useEffect } from "react";
import { toJsonSchema } from "../parse";
import { JSONSchema7 } from "json-schema";


function getFieldSchema({ kind, choices }: any): JSONSchema7 {
    switch (kind) {
        case 'input':
        case 'date':
            return { type: "string" };
        case 'textarea':
            return { type: "string", format: "textarea" };
        case 'checkbox':
            return { type: 'boolean' };
        case 'select':
            return {
                type: 'string',
                enum: choices
            };
        default:
            return { type: 'null' };

    }
}

export default function EditFieldsFormPlugin({ pluginId }: { pluginId: number }) {
    const register = useRegister();
    const { open } = usePanelController();
    const plugin = usePlugin(pluginId);
    const updatePlugin = useUpdatePlugin();

    if (!plugin) return <></>;

    const { title, description, fields } = plugin?.settings || {};
    let schema: JSONSchema7 = {};
    let uiSchema: JSONSchema7 = {};

    if (typeof fields === "string") {
        schema = toJsonSchema(
            JSON.parse(fields).map((field: any) => ({
                ...field,
                required: field.required === 'true'
            })
            ));
    } else {
        schema = fields.schema;
        uiSchema = fields.uiSchema
    }

    const ordering: string[] = ("ui:order" in uiSchema ? uiSchema["ui:order"] : Object.keys(schema.properties || {})) as string[];

    const requiredFields = new Set(schema.required || []);
    const initialDataFields = ordering.map((name: string) => {
        const def: any = schema.properties ? schema.properties[name] : {};
        // console.log("initialDataFields", { def });
        const extraProperties: any = {
            kind: "input"
        };
        if (def.type === "string" && def.format === "textarea") {
            extraProperties.kind = "textarea";
        }
        else if (def.type === "string" && def.format === "date") {
            extraProperties.kind = "date";
        }
        else if (def.type === "boolean") {
            extraProperties.kind = "checkbox";
        }
        else if (def.type === "string" && def.enum) {
            extraProperties.kind = "select";
            extraProperties.choices = def.enum;
        }

        return {
            name,
            label: def.title || name,
            description: def.description || undefined,
            format: def.format || undefined,
            required: requiredFields.has(name),
            ...extraProperties
        };
    });

    useEffect(() => {
        register({
            panelId: `editFieldsForm${pluginId}`,
            schema: {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "title": "Título do formulário"
                    },
                    "description": {
                        "type": "string",
                        "title": "Descrição do formulário",
                        "format": "textarea"
                    },
                    "fields": {
                        "type": "array",
                        "title": "Campos do Formulário",
                        "items": {
                            "type": "object",
                            "required": ["label", "name", "kind"],
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "title": "Nome interno"
                                },
                                "label": {
                                    "type": "string",
                                    "title": "Rótulo do campo"
                                },
                                "description": {
                                    "type": "string",
                                    "title": "Descrição"
                                },
                                "required": {
                                    "type": "boolean",
                                    "title": "Campo obrigatório?"
                                },
                                "kind": {
                                    "type": "string",
                                    "title": "Tipo de campo",
                                    "enum": [
                                        "input",
                                        "textarea",
                                        "checkbox",
                                        "multiple_choice",
                                        "select",
                                        "date"
                                    ],
                                    "enumNames": [
                                        "Texto Curto",
                                        "Texto Longo",
                                        "Checkbox",
                                        "Múltiplas Opções",
                                        "Lista de Opções",
                                        "Data"
                                    ]
                                }
                            },
                            "allOf": [
                                {
                                    "if": {
                                        "properties": { "kind": { "enum": ["select", "multiple_choice"] } },
                                        "required": ["kind"]
                                    },
                                    "then": {
                                        "properties": {
                                            "choices": {
                                                "type": "array",
                                                "title": "Opções",
                                                "items": {
                                                    "type": "string"
                                                },
                                                "minItems": 1
                                            }
                                        },
                                        "required": ["choices"]
                                    }
                                },
                                {
                                    "if": {
                                        "properties": { "kind": { "enum": ["input"] } },
                                        "required": ["kind"]
                                    },
                                    "then": {
                                        "properties": {
                                            "format": {
                                                "type": "string",
                                                "title": "Formato do campo",
                                                "defaultValue": "text",
                                                "enum": ["text", "email", "number", "uri", "phone"],
                                                "enumNames": ["Texto", "E-mail", "Número", "URL", "Telefone"]
                                            },
                                        },
                                        "required": ["format"]
                                    }
                                }
                            ]
                        },
                    }
                }
            },
            uiSchema: {
                fields: {
                    items: {
                        type: {
                            "ui:widget": "select"
                        },
                        format: {
                            "ui:widget": "select"
                        },
                        required: {
                            "ui:widget": "checkbox"
                        },
                        items: {
                            type: {
                                "ui:widget": "select"
                            },
                            format: {
                                "ui:widget": "select"
                            }
                        },

                    }
                }
            },
            initialData: { title, description, fields: initialDataFields },
            action: (data: any) => {
                // console.log("data", data);
                const schema: any = {
                    type: "object",
                    properties: {},
                    required: []
                };

                const uiSchema: any = {
                    "ui:order": []
                };

                data.fields.forEach((field: any) => {
                    const { name, label, kind, format, required, description } = field;
                    const extraSchema = getFieldSchema(field)

                    const property: any = {
                        title: label,
                        description,
                        ...extraSchema
                    };

                    if (format) {
                        property.format = format;
                    }

                    schema.properties[name] = property;

                    if (required) {
                        schema.required.push(name);
                    }

                    uiSchema["ui:order"].push(name);
                });


                updatePlugin({
                    id: plugin?.id,
                    settings: {
                        ...(plugin?.settings || {}),
                        title: data.title,
                        description: data.description,
                        fields: { schema, uiSchema }
                    }
                } as any);
                // console.log("Salvar Plugin", data);
            }
        })

    }, [register]);

    return (
        <button
            type="button"
            className="bg-gray-200 py-2 hover:bg-gray-300 cursor-pointer flex items-center justify-center gap-2"
            onClick={() => open(`editFieldsForm${pluginId}`)}
        >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                fill="#000"
                fillRule="evenodd"
                d="M21.121 2.707a3 3 0 0 0-4.242 0l-1.68 1.68-7.906 7.906a1 1 0 0 0-.263.464l-1 4a1 1 0 0 0 1.213 1.213l4-1a1 1 0 0 0 .464-.263l7.849-7.848 1.737-1.738a3 3 0 0 0 0-4.242l-.172-.172Zm-2.828 1.414a1 1 0 0 1 1.414 0l.172.172a1 1 0 0 1 0 1.414l-1.017 1.017-1.555-1.617.986-.986Zm-2.4 2.4 1.555 1.617-6.96 6.959-2.114.529.529-2.115 6.99-6.99ZM4 8a1 1 0 0 1 1-1h5a1 1 0 1 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-5a1 1 0 0 0-2 0v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Z"
                clipRule="evenodd"
                />
            </svg>
            <span>Editar formulário</span>
        </button>
    )
}