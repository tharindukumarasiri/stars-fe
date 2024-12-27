import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDraggable,
    useDroppable,
    DragOverlay
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    DownOutlined,
    RightOutlined,
    EditOutlined,
} from '@ant-design/icons';
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import style from '../DndStyles.module.scss'

import { useNodeDataStore } from '../store'

// const Item = forwardRef(({ id, layers, ...props }, ref) => {
//     const node = layers.find(item => item.id === id);

//     return (
//         <div
//             {...props} ref={ref}
//             className={`${style.layerItemContainer} ${node?.selected ? style.layerItemSelected : ''}`}
//         >
//             <div className='m-r-5 m-l-20 hover-hand'>
//                 {node?.hidden ?
//                     <EyeInvisibleOutlined /> : <EyeOutlined />
//                 }
//             </div>
//             <div className='m-r-5 hover-hand' >
//                 {node?.draggable === false ?
//                     <LockOutlined /> : <UnlockOutlined />
//                 }
//             </div>
//             <div className={style.layerShapeLabelContainer}>
//                 {node?.id}
//             </div>
//             <i
//                 className={`icon-delete-1 hover-hand ${style.layerDeleteIcon}`}
//             />
//         </div>
//     )
// });

const DraggableItem = ({ node, hideShowNode, lockNode, onDeleteNode, onSetNodeName }) => {
    const [isFocusedNodeInput, setIsFocusedNodeInput] = useState(false)
    const [nodeName, setNodeName] = useState(node?.data?.name ?? node?.id)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: node?.id,
    });
    const attributeStyle = {
        transform: CSS.Translate.toString(transform),
    };

    useEffect(() => {
        setNodeName(node?.data?.name ?? node?.id)
    }, [node])

    const onClickEdit = () => setIsFocusedNodeInput(true)

    const onBlur = () => {
        setIsFocusedNodeInput(pre => !pre)
        onSetNodeName(node?.id, nodeName)
    }

    const onChangeNodeName = (e) => {
        e.preventDefault();

        setNodeName(e.target.value);
    }

    return (
        <div
            key={node?.id}
            ref={setNodeRef} style={attributeStyle}
            className={`${style.layerItemContainer} ${node?.selected ? style.layerItemSelected : ''}`}
        >
            <div className='m-r-5 m-l-20 hover-hand' onClick={() => hideShowNode(node?.id)} >
                {node?.hidden ?
                    <EyeInvisibleOutlined /> : <EyeOutlined />
                }
            </div>
            <div className='m-r-5 hover-hand' onClick={() => lockNode(node?.id)} >
                {node?.draggable === false ?
                    <LockOutlined /> : <UnlockOutlined />
                }
            </div>
            <div className={style.layerShapeLabelContainer}
                {...(!isFocusedNodeInput ? listeners : {})}
                {...attributes}>
                {isFocusedNodeInput ?
                    <input type='text'
                        autoFocus
                        onBlur={onBlur}
                        onChange={onChangeNodeName}
                        className={style.layersInput}
                        value={nodeName}
                    /> : nodeName
                }
            </div>
            <div className='m-r-5' onClick={onClickEdit} >
                <EditOutlined />
            </div>
            <i
                className={`icon-delete-1 hover-hand ${style.layerDeleteIcon}`}
                onClick={(e) => onDeleteNode(e, node?.id)}
            />
        </div>
    )
}

const SortableItem = ({ item, nodes, setNodes, setEdges }) => {
    const [isFocusedLayersInput, setIsFocusedLayersInput] = useState(false)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item?.id });
    const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: item?.id,
    });

    const currentLayer = useNodeDataStore((state) => state.currentLayer);
    const setCurrentLayer = useNodeDataStore((state) => state.setCurrentLayer);

    const layers = useNodeDataStore((state) => state.layers);
    const setLayers = useNodeDataStore((state) => state.setLayers);

    const onBlur = () => setIsFocusedLayersInput(pre => !pre)
    const reversedNodes = [...nodes].reverse();

    const attributeStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const onDeleteNode = (e, id) => {
        e.stopPropagation();

        setNodes((nodes) => nodes.filter((node) => node?.id !== id && node?.parentNode !== id));
        setEdges((edges) => edges.filter((edge) => edge?.source !== id));
    }

    const hideShowNode = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.hidden = !node?.hidden ?? true
                    return newNode
                } else return node
            })
        )
    }

    const lockNode = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.draggable = node?.draggable === false ? true : false
                    return newNode
                } else return node
            })
        )
    }

    const setNodeName = (id, value) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.data.name = value
                    return newNode
                } else return node
            })
        )
    }


    const onChangeLayerText = (e, id) => {
        e.preventDefault();

        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].label = e.target.value;

        setLayers(copyOfLayers)
    }

    const onDeleteLayer = (e, id) => {
        e.stopPropagation();

        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers.splice(index, 1);

        setLayers(copyOfLayers)

        if (currentLayer === id) {
            let newCurrentLayerIndex = index
            if (newCurrentLayerIndex > copyOfLayers?.length - 1) {
                newCurrentLayerIndex = copyOfLayers?.length - 1
            }

            setCurrentLayer(copyOfLayers[newCurrentLayerIndex]?.id)
        }

        setNodes((nodes) => nodes.filter((node) => node?.data?.layer !== id));
    }


    const expandLayer = (id) => {
        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].expanded = !copyOfLayers[index]?.expanded;

        setLayers(copyOfLayers)
    }

    const hideLayer = (id) => {
        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].hidden = !copyOfLayers[index]?.hidden;

        setLayers(copyOfLayers)

        setNodes((nodes) =>
            nodes.map((node) => {
                if (node?.data?.layer === id) {
                    const newNode = { ...node }
                    newNode.hidden = !node?.hidden ?? true
                    return newNode
                } else return node
            })
        )
    }

    const lockLayer = (id) => {
        const copyOfLayers = [...layers]
        const index = copyOfLayers.findIndex(layer => layer.id === id)
        copyOfLayers[index].locked = !copyOfLayers[index]?.locked;

        setLayers(copyOfLayers)

        setNodes((nodes) =>
            nodes.map((node) => {
                if (node?.data?.layer === id) {
                    const newNode = { ...node }
                    newNode.draggable = node?.draggable === false ? true : false
                    return newNode
                } else return node
            })
        )
    }

    return (
        <div style={attributeStyle} ref={setDroppableNodeRef} key={item?.id}>
            <div
                key={item?.id + '1'}
                className={`${style.layerItemContainer} ${currentLayer === item?.id ? style.layerItemSelected : ''} hover-hand`}
                onPointerUp={() => setCurrentLayer(item?.id)}
                onDoubleClick={onBlur}
            >
                <div className='m-r-5' onPointerUp={() => expandLayer(item?.id)}>
                    {item?.expanded ?
                        <DownOutlined /> :
                        <RightOutlined />
                    }
                </div>
                <div className='m-r-5' onPointerUp={() => hideLayer(item?.id)} >
                    {item?.hidden ?
                        <EyeInvisibleOutlined /> : <EyeOutlined />
                    }
                </div>
                <div className='m-r-5' onPointerUp={() => lockLayer(item?.id)} >
                    {item?.locked ?
                        <LockOutlined /> : <UnlockOutlined />
                    }
                </div>
                <div ref={setNodeRef}
                    className={style.layerItemTextArea}
                    {...(!isFocusedLayersInput ? listeners : {})}
                    {...attributes}>
                    {currentLayer === item?.id && isFocusedLayersInput ?
                        <input type='text'
                            autoFocus
                            onBlur={onBlur}
                            onChange={(e) => onChangeLayerText(e, item?.id)}
                            className={style.layersInput}
                            value={item?.label}
                        /> : item?.label
                    }
                </div>

                <div className='m-r-5' onPointerUp={onBlur} >
                    <EditOutlined />
                </div>

                {layers?.length > 1 ?
                    <i
                        className={`icon-delete-1 ${style.layerDeleteIcon}`}
                        onPointerUp={(e) => onDeleteLayer(e, item?.id)}
                    /> : null
                }

            </div>
            {item?.expanded &&
                <>
                    {reversedNodes.map(node => {
                        if (node?.data?.layer === item?.id) {
                            return (
                                <DraggableItem
                                    node={node}
                                    hideShowNode={hideShowNode}
                                    lockNode={lockNode}
                                    onDeleteNode={onDeleteNode}
                                    onSetNodeName={setNodeName}
                                />
                            )
                        }
                    })}
                </>
            }
        </div>
    )
}

const SortableLayer = ({ items, nodes, setItems, setNodes, setEdges }) => {
    // const [activeId, setActiveId] = useState(null);
    const setCurrentLayer = useNodeDataStore((state) => state.setCurrentLayer);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map(item => <SortableItem
                    key={item?.id}
                    item={item}
                    nodes={nodes}
                    setNodes={setNodes}
                    setEdges={setEdges}
                />)}
            </SortableContext>
            <DragOverlay>
                {/* {activeId ? <Item id={activeId} layers={items} /> : null} */}
            </DragOverlay>
        </DndContext>
    );

    function handleDragStart(event) {
        const { active } = event;
        setCurrentLayer(active.id)
        // setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id?.includes("layer") && over.id?.includes("layer")) {
            if (active.id !== over.id) {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                const reArrangedList = arrayMove(items, oldIndex, newIndex);
                setItems(reArrangedList);
            }
        } else {
            const updatedNodes = nodes.map((node) => {
                if (node.id === active.id) {
                    const newNode = { ...node }
                    newNode.data = {
                        ...newNode.data,
                        layer: over.id
                    }
                    return newNode
                } else return node
            })
            const reversedItems = [...items].reverse();

            // sorting the nodes array according to the layers order bellow
            const layerOrderMap = reversedItems.reduce((acc, layer, index) => {
                acc[layer.id] = index;
                return acc;
            }, {});

            const sortedNodes = updatedNodes.sort((a, b) => {
                return (layerOrderMap[a.data.layer] ?? Infinity) - (layerOrderMap[b.data.layer] ?? Infinity);
            });

            setNodes(sortedNodes)
        }

        // setActiveId(null);
    }
}

export default SortableLayer