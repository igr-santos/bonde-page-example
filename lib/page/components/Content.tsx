"use client";
import React from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useBlocks, useEditable, useMoveBlock } from "../hooks";
import Block from "./Block";


function Content() {
    const editable = useEditable();
    const blocks = useBlocks();
    const moveBlock = useMoveBlock();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: any) {
        const {active, over} = event;
        // console.log("handleDragEnd")
        if (active.id !== over.id) {
            // console.log("handleDragEnd if")
            moveBlock(active, over);
            // console.log("changeItems", { active, over });
            // setItems((items) => {
            //     const oldIndex = items.indexOf(active.id);
            //     const newIndex = items.indexOf(over.id);
                
            //     return arrayMove(items, oldIndex, newIndex);
            // });
        }
    }

    if (editable) {
        return (
            <main className="flex-1 overflow-auto">
                <DndContext 
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    modifiers={[restrictToVerticalAxis]}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={blocks}
                        strategy={verticalListSortingStrategy}
                    >
                        {blocks.map(({ id }) => <Block key={`block-${id}`} id={id} />)}
                    </SortableContext>
                </DndContext>
            </main>
        )
    }

    return (
        <main className="flex-1 overflow-auto">
            {blocks.map(({ id }) => <Block key={`block-${id}`} id={id} />)}
        </main>
    )
}

export default React.memo(Content);