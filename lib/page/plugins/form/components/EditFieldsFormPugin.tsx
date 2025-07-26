import { usePanelController, useRegister } from "@/lib/admin"
import { usePlugin, useUpdatePlugin } from "@/lib/page/hooks";
import { useEffect } from "react";
import { toJsonSchema } from "../parse";
import { JSONSchema7 } from "json-schema";


export default function EditFieldsFormPlugin({ pluginId }: { pluginId: number }) {
    const register = useRegister();
    const { open } = usePanelController();
    const plugin = usePlugin(pluginId);
    const updatePlugin = useUpdatePlugin();

    if (!plugin) return <></>;

    const { fields } = plugin?.settings || {};
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

    const ordering: string[] = "ui:order" in uiSchema ? uiSchema["ui:order"] : Object.keys(schema.properties || {});

    const requiredFields = new Set(schema.required || []);
    const initialDataFields = ordering.map((name: string) => {
        const def: any = schema.properties ? schema.properties[name] : {};

        return {
            name,
            label: def.title || name,
            description: def.description || undefined,
            type: def.type || "string",
            format: def.format || undefined,
            required: requiredFields.has(name)
        };
    });

    console.log("initialDataFields", { initialDataFields });

    useEffect(() => {
        register({
            panelId: `editFieldsForm${pluginId}`,
            schema: {
                "type": "object",
                "properties": {
                    "fields": {
                        "type": "array",
                        "title": "Campos do Formulário",
                        "items": {
                            "type": "object",
                            "required": ["label", "name", "type"],
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
                                "type": {
                                    "type": "string",
                                    "title": "Tipo do campo",
                                    "enum": ["string", "number", "integer", "boolean", "null", "array"]
                                },
                                "format": {
                                    "type": "string",
                                    "title": "Formato do campo",
                                    "enum": ["email", "uri", "data-url", "date", "date-time", "time"]
                                },
                                "required": {
                                    "type": "boolean",
                                    "title": "Campo obrigatório?"
                                }
                            }
                        },
                        dependencies: {
                            type: {
                                oneOf: [
                                    // Para tipo "array", adiciona propriedade "items"
                                    {
                                        properties: {
                                            type: { const: "array" },
                                            items: {
                                                type: "object",
                                                title: "Definição dos itens do array",
                                                required: ["type"],
                                                properties: {
                                                    type: {
                                                        type: "string",
                                                        title: "Tipo dos itens",
                                                        enum: ["string", "number", "integer", "boolean", "object"]
                                                    },
                                                    format: {
                                                        type: "string",
                                                        title: "Formato dos itens",
                                                        enum: ["email", "uri", "date"]
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    // Default: sem campo extra
                                    {
                                        properties: {
                                            type: {
                                                enum: ["string", "number", "integer", "boolean", "null"]
                                            }
                                        }
                                    }
                                ]
                            }
                        }
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
                        }
                    }
                }
            },
            initialData: { fields: initialDataFields },
            action: (data: any) => {
                const schema: any = {
                    type: "object",
                    properties: {},
                    required: []
                };

                const uiSchema: any = {
                    "ui:order": []
                };

                data.fields.forEach((field: any) => {
                    const { name, label, type, format, required, description } = field;

                    const property: any = {
                        type,
                        title: label,
                        description
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
                        fields: { schema, uiSchema }
                    }
                } as any);
                console.log("Salvar Plugin", data);
            }
        })

    }, [register]);

    console.log("EditFieldsFormPlugin", { plugin, schema });
    return (
        <button type="button" onClick={() => open(`editFieldsForm${pluginId}`)}>Editar formulário</button>
    )
}