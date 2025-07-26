import { useMemo } from 'react';

/** The `ArrayFieldTemplateItemButtons` component is the template used to render the buttons associate3d with items of
 * an array.
 *
 * @param props - The `ArrayFieldItemButtonsTemplateType` props for the component
 */
export default function ArrayFieldItemButtonsTemplate(props: any) {
    const {
        disabled,
        hasCopy,
        hasMoveDown,
        hasMoveUp,
        hasRemove,
        index,
        onCopyIndexClick,
        onDropIndexClick,
        onReorderClick,
        readonly,
        registry,
        uiSchema,
    } = props;
    console.log("ArrayFieldItemButtonsTemplate", props);
    // const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } = registry.templates.ButtonTemplates;
    const onCopyClick = useMemo(() => onCopyIndexClick(index), [index, onCopyIndexClick]);
    const onRemoveClick = useMemo(() => onDropIndexClick(index), [index, onDropIndexClick]);
    const onArrowUpClick = useMemo(() => onReorderClick(index, index - 1), [index, onReorderClick]);
    const onArrowDownClick = useMemo(() => onReorderClick(index, index + 1), [index, onReorderClick]);

    return (
        <>
            {(hasMoveUp || hasMoveDown) && (
                <button
                    id={`moveUp_${index}`}
                    className='p-2 border cursor-pointer hover:bg-black/20'
                    disabled={disabled || readonly || !hasMoveUp}
                    onClick={onArrowUpClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M12 3a1 1 0 0 1 .707.293l7 7a1 1 0 0 1-1.414 1.414L13 6.414V20a1 1 0 1 1-2 0V6.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l7-7A1 1 0 0 1 12 3Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
            {(hasMoveUp || hasMoveDown) && (
                <button
                    id={`moveDown_${index}`}
                    className='p-2 border cursor-pointer hover:bg-black/20'
                    disabled={disabled || readonly || !hasMoveDown}
                    onClick={onArrowDownClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M12 3a1 1 0 0 1 1 1v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 0 1 1-1Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
            {hasCopy && (
                <button
                    id={`copy_${index}`}
                    className='p-2 border cursor-pointer hover:bg-black/20'
                    disabled={disabled || readonly}
                    onClick={onCopyClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153-1.172.158-2.121.49-2.87 1.238-.748.749-1.08 1.698-1.238 2.87-.153 1.14-.153 2.595-.153 4.433V16a3.751 3.751 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947.602.602 1.36.86 2.26.982.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116.9-.122 1.658-.38 2.26-.982.602-.602.86-1.36.982-2.26.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337-.122-.9-.38-1.658-.982-2.26-.531-.53-1.183-.795-1.947-.932A3.751 3.751 0 0 0 15 1.25Zm2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14-1.005.135-1.585.389-2.008.812-.423.423-.677 1.003-.812 2.009-.138 1.028-.14 2.382-.14 4.289v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337.12-.9.38-1.658.981-2.26.602-.602 1.36-.86 2.26-.981.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021ZM7.408 6.41c.277-.277.665-.457 1.4-.556.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103.734.099 1.122.28 1.399.556.277.277.457.665.556 1.4.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192-.099.734-.28 1.122-.556 1.399-.277.277-.665.457-1.4.556-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103-.734-.099-1.122-.28-1.399-.556-.277-.277-.457-.665-.556-1.4-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192.099-.734.28-1.122.556-1.399Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
            {hasRemove && (
                <button
                    id={`remove_${index}`}
                    className='p-2 border cursor-pointer hover:bg-black/20'
                    disabled={disabled || readonly}
                    onClick={onRemoveClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="#000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m18 6-.8 12.013c-.071 1.052-.106 1.578-.333 1.977a2 2 0 0 1-.866.81c-.413.2-.94.2-1.995.2H9.994c-1.055 0-1.582 0-1.995-.2a2 2 0 0 1-.866-.81c-.227-.399-.262-.925-.332-1.977L6 6M4 6h16m-4 0-.27-.812c-.263-.787-.394-1.18-.637-1.471a2 2 0 0 0-.803-.578C13.938 3 13.524 3 12.694 3h-1.388c-.829 0-1.244 0-1.596.139a2 2 0 0 0-.803.578c-.243.29-.374.684-.636 1.471L8 6m6 4v7m-4-7v7"
                        />
                    </svg>
                </button>
            )}
        </>
    );
}