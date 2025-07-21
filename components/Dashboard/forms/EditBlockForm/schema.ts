import type { RJSFSchema, UiSchema } from "@rjsf/utils";


const schema: RJSFSchema = {
    title: "Editar Bloco",
    type: "object",
    properties: {
        name: { type: ["string", "null"], title: "Nome" },
        bg_class: { type: ["string", "null"], title: "Cor de fundo" },
        bg_imagem: { type: ["string", "null"], title: "Imagem de fundo" },
        hidden: { type: ["boolean", "null"], title: "Esconder Bloco?" },
        menu_hidden: { type: ["boolean", "null"], title: "Esconder menu?" },
    }
}

export const uiSchema: UiSchema = {
    bg_class: {
        "ui:widget": "color"
    }
}

export default schema;
// name
// bg_class
// position
// hidden
// bg_image
// menu_hidden
