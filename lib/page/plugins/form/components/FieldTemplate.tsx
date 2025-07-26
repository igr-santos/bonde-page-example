import React, { useEffect } from "react";
import {
    FieldTemplateProps,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
    getTemplate,
    getUiOptions,
} from '@rjsf/utils';
import { useRegister } from '@/lib/admin';


const REQUIRED_FIELD_SYMBOL = '*';

export type LabelProps = {
  /** The label for the field */
  label?: string;
  /** A boolean value stating if the field is required */
  required?: boolean;
  /** The id of the input field being labeled */
  id?: string;
};

/** Renders a label for a field
 *
 * @param props - The `LabelProps` for this component
 */
export function Label(props: LabelProps) {
  const { label, required, id } = props;
  if (!label) {
    return null;
  }
  return (
    <label className='control-label' htmlFor={id}>
      {label}
      {required && <span className='required'>{REQUIRED_FIELD_SYMBOL}</span>}
    </label>
  );
}

export default function FieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any,
>(props: FieldTemplateProps<T, S, F>) {
    const register = useRegister();
  
    const { id, label, children, errors, help, description, hidden, required, displayLabel, registry, uiSchema } = props;
    const uiOptions = getUiOptions(uiSchema);
    const WrapIfAdditionalTemplate = getTemplate<'WrapIfAdditionalTemplate', T, S, F>(
        'WrapIfAdditionalTemplate',
        registry,
        uiOptions,
    );
    
    useEffect(() => {
        register({
          panelId: `editField${props.id}`,
          schema: {
            title: "Editar campo",
            type: "object",
            properties: {
              name: { type: "string", title: "Nome" },
              title: { type: "string", title: "Titulo" }
            }
          },
          initialData: {
            name: props.id.split("_")[-1],
            title: props.schema.title
          },
          action: (data) => {
            console.log("updatePlugin", { data });
          }
        })
    }, [])

    console.log("FieldTemplate", { props });

    if (hidden) {
        return <div className='hidden'>{children}</div>;
    }

    return (
        <WrapIfAdditionalTemplate {...props}>
            {displayLabel && <Label label={label} required={required} id={id} />}
            {displayLabel && description ? description : null}
            {children}
            {errors}
            {help}
        </WrapIfAdditionalTemplate>
    );
}