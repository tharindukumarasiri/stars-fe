import React, { useCallback, useMemo } from 'react';
import { useReactFlow } from 'reactflow';

import style from '../DndStyles.module.scss'
import { useNodeDataStore } from '../store'
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { getId } from '../utils'

export default function ContextMenu({ id, top, left, ...props }) {
    const { getNode, setNodes, setEdges, getNodes } = useReactFlow();

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const size = useNodeDataStore((state) => state.size)?.find(item => item.id === id);
    const setSize = useNodeDataStore((state) => state.setSize);
    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === id);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const setReferenceModalId = useNodeDataStore((state) => state.setReferenceModalId);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);
    const setFormFillData = useDiagramStore((state) => state.setFormFillData);

    const node = useMemo(() => {
        return getNode(id);
    }, [id])

    const duplicateNode = useCallback(() => {
        const position = {
            x: node.position.x + 50,
            y: node.position.y + 20,
        };

        const newNodeId = getId(node.id?.split('_')[0]);

        const newNodeTextData = { ...textdata };
        delete newNodeTextData.id

        const newChartData = { ...chartData };
        delete newChartData.id

        const newNodeSize = { ...size };
        delete newNodeSize.id

        const newNode = {
            ...node,
            id: newNodeId,
            position,
            selected: false
        };

        setNodes((nds) => nds.concat(newNode));

        onTextChange(newNodeId, newNodeTextData)
        changeChartData(newNodeId, newChartData)
        setSize(newNodeId, newNodeSize)
    }, [id, getNode, setNodes, textdata, chartData]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node?.id !== id && node?.parentNode !== id));
        setEdges((edges) => edges.filter((edge) => edge?.source !== id));
    }, [id, setNodes, setEdges]);

    const moveToBack = useCallback(() => {
        const nodes = getNodes();
        const node = getNode(id);

        const newNodes = nodes.filter((node) => node?.id !== id);
        newNodes.unshift(node);

        setNodes(newNodes)
    }, [id, setNodes, getNode, getNodes]);

    const moveToFront = useCallback(() => {
        const nodes = getNodes();
        const node = getNode(id);

        const newNodes = nodes.filter((node) => node?.id !== id);
        newNodes.push(node);

        setNodes(newNodes)
    }, [id, setNodes, getNode, getNodes]);

    const openReferenceModal = () => {
        setReferenceModalId(id)
    }

    const openFormModal = (form) => {
        setFormsModalVisible(true);
        form.nodeId = id
        setFormFillData(form);
    }

    return (
        <div style={{ top, left }} className={style.canvasContextMenu} {...props}>
            <button onClick={duplicateNode}>Duplicate</button>
            <button onClick={deleteNode}>Delete</button>
            <button onClick={moveToBack}>Move to back</button>
            <button onClick={moveToFront}>Move to front</button>
            <button onClick={openReferenceModal}>Reference</button>
            {node?.data?.forms?.length > 0 &&
                <div>
                    <button>Forms</button>
                    <div className={style.formButtonContainer}>
                        {node?.data?.forms?.map((form, index) => {
                            return (
                                <div key={index} >
                                    <button onClick={() => openFormModal(form)} className='pos-r'>
                                        {form?.Name}
                                        {form?.responded ? 
                                            <i className='icon-success white pos-a' style={{ right: 3}} /> : null
                                        }
                                    </button>
                                    
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}
