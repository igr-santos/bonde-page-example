import type { RJSFSchema } from "@rjsf/utils";

const schema: RJSFSchema = {
    title: "Editar Bloco",
    type: "object",
    properties: {
        name: { type: "string", title: "Nome" },
        bg_class: { type: "string", title: "Cor de fundo" },
        bg_imagem: { type: "string", title: "Imagem de fundo" },
        hidden: { type: "boolean", title: "Esconder Bloco?" },
        menu_hidden: { type: "boolean", title: "Esconder menu?" },
    }
}

export default schema;