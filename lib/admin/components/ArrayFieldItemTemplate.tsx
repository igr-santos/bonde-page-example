import { CSSProperties } from 'react';
import {
    getTemplate,
    getUiOptions,
} from '@rjsf/utils';

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldItemTemplateType` props for the component
 */
export default function ArrayFieldItemTemplate(props: any) {
    const { children, className, hasToolbar, registry, uiSchema, ...buttonsProps } = props;
    const uiOptions = getUiOptions<T, S, F>(uiSchema);
    const ArrayFieldItemButtonsTemplate = getTemplate<any>(
        'ArrayFieldItemButtonsTemplate',
        registry,
        uiOptions,
    );
    const btnStyle: CSSProperties = {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6,
        fontWeight: 'bold',
    };

    return (
        <div className={`relative border-b border-b-gray-200 mb-5
            ${className}
        `}>
            <div>{children}</div>
            {hasToolbar && (
                <div className='absolute top-0 right-0 flex gap-2'>
                    <ArrayFieldItemButtonsTemplate registry={registry} style={btnStyle} {...buttonsProps} />
                </div>
            )}
        </div>
    );
}