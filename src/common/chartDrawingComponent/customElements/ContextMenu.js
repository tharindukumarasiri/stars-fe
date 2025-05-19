import React, { useCallback, useMemo } from 'react';
import { useReactFlow } from 'reactflow';
import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import style from '../DndStyles.module.scss'
import { useNodeDataStore } from '../store'
import { useDiagramStore } from '../../../Views/ChartDrawing/chartDrawingStore'
import { getId } from '../utils'

const { confirm } = Modal;

export default function ContextMenu({ id, top, left, ...props }) {
    const { getNode, setNodes, setEdges, getNodes } = useReactFlow();

    const {
        textdata: allTextData,
        onTextChange,
        size: allSize,
        setSize,
        chartData: allChartData,
        setChartData: changeChartData,
        setReferenceModalId,
    } = useNodeDataStore()

    const textdata = allTextData?.find(item => item.id === id);
    const size = allSize?.find(item => item.id === id);
    const chartData = allChartData.find(item => item.id === id);
    const onChangeChartData = (value) => changeChartData(id, value);
    const setFormsModalVisible = useDiagramStore((state) => state.setFormsModalVisible);
    const setFormFillData = useDiagramStore((state) => state.setFormFillData);

    const selectedColumn = chartData?.selectedColumn ?? null;
    const setSelectedColumn = (value) => onChangeChartData({ selectedColumn: value })

    const selectedRow = chartData?.selectedRow ?? null;
    const setSelectedRow = (value) => onChangeChartData({ selectedRow: value })

    const columnsCount = chartData?.columnsCount || 1;
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value });

    const rowsCount = chartData?.rowsCount || 1;
    const setRowsCount = (value) => onChangeChartData({ rowsCount: value });

    const columnsData = chartData?.columnsData || [];
    const setColumnsData = (value) => onChangeChartData({ columnsData: value })

    const rowsData = chartData?.rowsData || [];
    const setRowsData = (value) => onChangeChartData({ rowsData: value })

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
            selected: true
        };

        setNodes((nodes) => {
            const clearSelectedNodes = nodes.map((n) => {
                const newNodeData = { ...n }
                newNodeData.selected = false;
                return newNodeData;
            })

            const updatedNodes = [...clearSelectedNodes, newNode];
            return updatedNodes;
        });

        onTextChange(newNodeId, newNodeTextData)
        changeChartData(newNodeId, newChartData)
        setSize(newNodeId, newNodeSize)
    }, [id, getNode, setNodes, textdata, chartData]);

    const deleteNode = useCallback(() => {
        confirm({
            title: 'Are you sure you want to delete the shape',
            icon: <ExclamationCircleOutlined />,

            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                setNodes((nodes) => nodes.filter((node) => node?.id !== id && node?.parentId !== id));
                setEdges((edges) => edges.filter((edge) => edge?.source !== id));
            },
        });
    }, [id, setNodes, setEdges]);

    const moveToBack = useCallback(() => {
        const nodes = getNodes();
        const node = getNode(id);

        if (node?.type === 'group') {
            const itemsToShift = [];
            nodes?.map(item => {
                if (item?.parentId === node?.id) {
                    itemsToShift.push(item);
                }
            })

            const filteredNodes = nodes.filter((node) => {
                return !itemsToShift.some((item) => item.id === node.id || node?.id === id)
            });
            const newNodes = [...itemsToShift, node, ...filteredNodes];

            setNodes(newNodes)
        } else {
            const newNodes = nodes.filter((node) => node?.id !== id);
            newNodes.unshift(node);

            setNodes(newNodes)
        }

    }, [id, setNodes, getNode, getNodes]);

    const moveToFront = useCallback(() => {
        const nodes = getNodes();
        const node = getNode(id);

        if (node?.type === 'group') {
            const itemsToShift = [];
            nodes?.map(item => {
                if (item?.parentId === node?.id) {
                    itemsToShift.push(item);
                }
            })

            const filteredNodes = nodes.filter((node) => {
                return !itemsToShift.some((item) => item.id === node.id || node?.id === id)
            });
            const newNodes = [...filteredNodes, ...itemsToShift, node,];

            setNodes(newNodes)
        } else {
            const newNodes = nodes.filter((node) => node?.id !== id);
            newNodes.push(node);

            setNodes(newNodes)
        }
    }, [id, setNodes, getNode, getNodes]);

    const openReferenceModal = () => {
        setReferenceModalId(id)
    }

    const openFormModal = (form) => {
        setFormsModalVisible(true);
        form.nodeId = id
        setFormFillData(form);
    }

    const addColumnToRight = () => {
        const newColumnData = [...columnsData]
        newColumnData.splice(selectedColumn + 1, 0, { title: "" })
        setColumnsCount(columnsCount + 1)
        setColumnsData(newColumnData)
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.width = newNode.width + 400
                    return newNode
                } else return node
            })
        )
    }

    const addColumnToLeft = () => {
        const newColumnData = [...columnsData]
        newColumnData.splice(selectedColumn, 0, { title: "" })
        setColumnsCount(columnsCount + 1)
        setColumnsData(newColumnData)
        setSelectedColumn(selectedColumn + 1)
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.width = newNode.width + 400
                    return newNode
                } else return node
            })
        )
    }

    const addRowToTop = () => {
        const newRowsData = [...rowsData]
        newRowsData.splice(selectedRow, 0, { title: "" })
        setRowsCount(rowsCount + 1)
        setRowsData(newRowsData)
        setSelectedRow(selectedRow + 1)
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.height = newNode.height + 400
                    return newNode
                } else return node
            })
        )
    }

    const addRowToBottom = () => {
        const newRowsData = [...rowsData]
        newRowsData.splice(selectedRow + 1, 0, { title: "" })
        setRowsCount(rowsCount + 1)
        setRowsData(newRowsData)
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.height = newNode.height + 400
                    return newNode
                } else return node
            })
        )
    }

    return (
        <div style={{ top, left }} className={style.canvasContextMenu} {...props}>
            {(node?.type === "MatrixTable" || node?.type === "Table2") && selectedColumn !== null &&
                <>
                    <button onClick={addColumnToRight}>Add column to right</button>
                    <button onClick={addColumnToLeft}>Add column to left</button>
                </>
            }
            {(node?.type === "MatrixTable" || node?.type === "Table2") && selectedRow !== null &&
                <>
                    <button onClick={addRowToTop}>Add row to Top</button>
                    <button onClick={addRowToBottom}>Add row to Bottom</button>
                </>
            }
            {node?.type !== "group" && <button onClick={duplicateNode}>Duplicate</button>}
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
                                            <i className='icon-success white pos-a' style={{ right: 3 }} /> : null
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
