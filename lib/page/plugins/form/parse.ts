import type { JSONSchema7 } from "json-schema";


export function toJsonSchema(fields: any[]): JSONSchema7 {
    const properties: Record<string, JSONSchema7> = {};
    const required: string[] = [];

    fields.forEach(field => {
        const name = field.uid;

        const type = field.kind === 'email' ? 'string'
            : field.kind === 'text' ? 'string'
                : 'string'; // fallback

        const format = field.kind === 'email' ? 'email' : undefined;

        properties[name] = {
            type,
            title: field.label,
            description: field.placeholder,
            ...(format && { format })
        };

        if (field.required) {
            required.push(name);
        }
    });

    return {
        type: 'object',
        properties,
        required
    };
}
