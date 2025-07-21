import React from "react";
import Form from "@rjsf/core";
import validator from '@rjsf/validator-ajv8';

import { useBlock, useUpdateBlock } from "@/lib/page/hooks"
import schema, { uiSchema } from "./schema";
import { PageBlock } from "@/lib/page/types";


function EditBlockForm ({ id }: { id: number }) {
    const block = useBlock(id);
    const updateBlock = useUpdateBlock();

    return (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onSubmit={({ formData }, e: any) => {
                updateBlock({ id: block?.id, ...formData });
            }}
            formData={{
                name: block?.name,
                bg_class: block?.bg_class,
                bg_image: block?.bg_imagem,
                hidden: block?.hidden,
                menu_hidden: block?.menu_hidden
                // position
            }}
        />
    )
}

export default React.memo(EditBlockForm);