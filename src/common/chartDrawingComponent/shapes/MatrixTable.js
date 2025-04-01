import React, { memo, useEffect, useMemo, useState } from "react";
import { useReactFlow } from 'reactflow';
import { Input } from "antd";

import { useNodeDataStore } from "../store";
import Shapes from "../ShapesData.js";
import { ChartOrientations, getRgbaColor } from "../utils";

import style from "../DndStyles.module.scss";

const { TextArea } = Input;

function MatrixChart({ id, selected, type }) {
    const { setNodes } = useReactFlow();

    const shapeData = Shapes[type];
    const initialHeight = shapeData?.size?.height;
    const initialWidth = shapeData?.size?.width;

    let sectionNumber = 0

    const [disableInput, setDisableInput] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const {
        size: sizes,
        setSize: onSizeChange,
        textdata: textDataState,
        chartData: chartDataState,
        setChartData: changeChartData,
    } = useNodeDataStore()

    const size = sizes.find((item) => item.id === id) || {
        height: initialHeight,
        width: initialWidth,
    };
    const setSize = (value) => onSizeChange(id, value);

    const chartData = chartDataState.find(
        (item) => item.id === id
    );
    const onChangeChartData = (value) => changeChartData(id, value);

    // const nodeData = chartData?.nodeData || [];
    // const setNodeData = (value) => onChangeChartData({ nodeData: value });

    const chartName = chartData?.chartName || ''
    const chartOrientation = chartData?.chartOrientation || ChartOrientations.BOTH
    const rowsCount = chartData?.rowsCount || 1;

    const rowsData = chartData?.rowsData || [];
    const setRowsData = (value) => onChangeChartData({ rowsData: value })

    const selectedColumn = chartData?.selectedColumn ?? null;
    const setSelectedColumn = (value = null) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.draggable = value === null ? true : false
                    return newNode
                } else return node
            })
        )
        onChangeChartData({ selectedRow: null })
        onChangeChartData({ selectedColumn: value })
    }

    const selectedRow = chartData?.selectedRow ?? null;
    const setSelectedRow = (value) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.draggable = value === null ? true : false
                    return newNode
                } else return node
            })
        )
        onChangeChartData({ selectedColumn: null })
        onChangeChartData({ selectedRow: value })
    }

    const matrixPadding = chartData?.matrixPadding || 0;
    const hideTools = chartData?.hideTools || false;

    const columnsCount = chartData?.columnsCount || 1;
    const columnsColor = chartData?.columnsColor || '#D9D9D9'
    const rowsColor = chartData?.rowsColor || '#8B8B8B'

    const columnsData = chartData?.columnsData || [];
    const setColumnsData = (value) => onChangeChartData({ columnsData: value })

    const textdata = textDataState?.find(
        (item) => item.id === id
    );

    const onColumnDataChange = (e, index) => {
        const copyOfColumnsData = [...columnsData]
        copyOfColumnsData[index] = {
            ...copyOfColumnsData[index],
            title: e.target.value
        }
        setColumnsData(copyOfColumnsData)
    }

    const onRowsDataChange = (e, index) => {
        const copyOfRowsData = [...rowsData]
        copyOfRowsData[index] = {
            ...copyOfRowsData[index],
            title: e.target.value
        }
        setRowsData(copyOfRowsData)
    }

    const backgroundColor = textdata?.backgroundColor || 'transparent';
    const fonstSize = Number(textdata?.fonstSize) || 8;
    const textType = textdata?.textType || { label: "Poppins", type: "Poppins" };
    const textColor = getRgbaColor(textdata?.textColor) || "black";
    const textBold = textdata?.textBold || false;
    const textAlign = textdata?.textAlign || 'center'

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
    };

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? "bolder" : "normal",
        textAlign: textAlign,
    };

    useEffect(() => {
        if (sizes.find((item) => item.id === id)) return;

        setSize({ height: initialHeight, width: initialWidth });
    }, []);

    const rowsList = useMemo(() => {
        return Array.from(Array(rowsCount));
    }, [rowsCount]);

    const columnList = useMemo(() => {
        return Array.from(Array(columnsCount));
    }, [columnsCount]);

    // const onResize = (_, size) => setSize(size);

    // const addNewItem = (sectionNumber, elementColIndex) => {
    //     const newNodeData = JSON.parse(JSON.stringify(nodeData));
    //     const sectionData = newNodeData[sectionNumber]
    //     const allElementsData = sectionData?.elementData ?? []

    //     const elementsColumnData = allElementsData[elementColIndex] ?? []

    //     elementsColumnData.push({ text: '' })

    //     allElementsData[elementColIndex] = elementsColumnData
    //     sectionData.elementData = allElementsData
    //     newNodeData[sectionNumber] = sectionData

    //     setNodeData(newNodeData);
    // };

    const handleHorizontalResize = (e, index) => {
        let preClientX;
        let increasedAmount = 0;

        setIsDragging(true);

        // Add listeners for mouse move and mouse up
        const handleMouseMove = (e) => {
            if (preClientX) {
                increasedAmount += e.clientX - preClientX
            }

            preClientX = e.clientX

            if (increasedAmount) {
                const copyOfColumnsData = [...columnsData]
                copyOfColumnsData[index] = {
                    ...copyOfColumnsData[index],
                    width: (copyOfColumnsData[index]?.width ?? 400) + increasedAmount
                }
                setColumnsData(copyOfColumnsData)

                let calculatedWidth = 50

                Array.from(Array(columnsCount).keys()).map((_, i) => {

                    if (copyOfColumnsData?.[i]?.width) {
                        calculatedWidth += copyOfColumnsData?.[i]?.width
                    } else {
                        calculatedWidth += 400
                    }
                })

                setNodes((nodes) =>
                    nodes.map((node) => {
                        if (node.id === id) {
                            const newNode = { ...node }
                            newNode.width = calculatedWidth
                            return newNode
                        } else return node
                    })
                )

            }

        };

        const handleMouseUp = () => {
            setTimeout(() => setIsDragging(false), 500);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleVerticalResize = (e, index) => {
        let preClientY;
        let increasedAmount = 0;

        setIsDragging(true);

        // Add listeners for mouse move and mouse up
        const handleMouseMove = (e) => {
            if (preClientY) {
                increasedAmount += e.clientY - preClientY
            }

            preClientY = e.clientY

            if (increasedAmount) {
                const copyOfRowsData = [...rowsData]
                copyOfRowsData[index] = {
                    ...copyOfRowsData[index],
                    height: (copyOfRowsData[index]?.height ?? 400) + increasedAmount
                }
                setRowsData(copyOfRowsData)

                let calculatedHeight = 50

                Array.from(Array(columnsCount).keys()).map((_, i) => {

                    if (copyOfRowsData?.[i]?.height) {
                        calculatedHeight += copyOfRowsData?.[i]?.height
                    } else {
                        calculatedHeight += 400
                    }
                })

                setNodes((nodes) =>
                    nodes.map((node) => {
                        if (node.id === id) {
                            const newNode = { ...node }
                            newNode.height = calculatedHeight
                            return newNode
                        } else return node
                    })
                )
            }
        };

        const handleMouseUp = () => {
            setTimeout(() => setIsDragging(false), 500);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const onKeyDown = (e) => {
        if (e.key === " " && e.repeat) {
            setDisableInput(true);
        } else if (disableInput) {
            setDisableInput(false);
        }
    };

    return (
        <div className={style.matrixTableContainer} style={mainContainerStyle} onClick={() => {
            if (selectedColumn !== null && !isDragging)
                setSelectedColumn(null)
            if (selectedRow !== null && !isDragging)
                setSelectedRow(null)
        }}>
            <div>{chartName}</div>
            {rowsList.map((_, rowIndex) => {
                return (
                    <div className={style.matrixTableMainRow} key={rowIndex + 'main'}>
                        {chartOrientation !== ChartOrientations.VERTICAL && (
                            <div
                                className={style.matrixTableRowHeader}
                                key={rowIndex + 'title'}
                                style={{
                                    paddingTop: matrixPadding,
                                    paddingBottom: matrixPadding,
                                }}
                            >
                                <div className={style.matrixTableRowHeaderTextContainer}
                                    style={{
                                        backgroundColor: rowsData[rowIndex]?.color ?? rowsColor
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedRow(rowIndex)
                                    }}
                                >
                                    {/* {rowsData[rowIndex]} */}
                                    <TextArea
                                        autoSize
                                        style={{
                                            ...textAreaStyle, ...{
                                                transform: 'rotate(270deg)'
                                            },
                                            minWidth: rowsData[rowIndex]?.height ?? 400,
                                        }}
                                        placeholder={`Row ${rowIndex + 1}`}
                                        className={style.drawingTextArea}
                                        value={rowsData[rowIndex]?.title}
                                        onChange={(e) => onRowsDataChange(e, rowIndex)}
                                        onKeyDown={onKeyDown}
                                    />
                                </div>
                            </div>
                        )}

                        {columnList.map((_, columnIndex) => {
                            // const sectionData = nodeData[sectionNumber] || {};
                            // const elementList = Array.from(Array(sectionData?.columnsCount ?? 0))
                            sectionNumber++

                            return (
                                <div
                                    key={sectionNumber}
                                    className={style.matrixTableSection}
                                    style={{
                                        backgroundColor: getRgbaColor(backgroundColor),
                                        marginRight: matrixPadding, marginBottom: matrixPadding, marginTop: matrixPadding,
                                        minWidth: columnsData[columnIndex]?.width ?? 400, maxWidth: columnsData[columnIndex]?.width ?? 400,
                                        minHeight: rowsData[rowIndex]?.height ?? 400, maxHeight: rowsData[rowIndex]?.height ?? 400,
                                        ...(selectedColumn === columnIndex ?
                                            {
                                                borderLeftColor: 'blue', borderRightColor: 'blue',
                                                ...(rowIndex === 0 ? { borderTopColor: 'blue' } : {}),
                                                ...(rowIndex === rowsList.length - 1 ? { borderBottomColor: 'blue' } : {})
                                            }
                                            : {}),

                                        ...(selectedRow === rowIndex ?
                                            {
                                                borderTopColor: 'blue', borderBottomColor: 'blue',
                                                ...(columnIndex === 0 ? { borderLeftColor: 'blue' } : {}),
                                                ...(columnIndex === columnList.length - 1 ? { borderRightColor: 'blue' } : {})
                                            }
                                            : {})
                                    }}
                                >
                                    {selectedColumn !== null &&
                                        <div
                                            className={style.matrixTableRIghtEdgeHandle}
                                            onMouseDown={(e) => handleHorizontalResize(e, columnIndex)}
                                        />
                                    }
                                    {selectedRow !== null &&
                                        <div
                                            className={style.matrixTableBottomEdgeHandle}
                                            onMouseDown={(e) => handleVerticalResize(e, rowIndex)}
                                        />
                                    }

                                    {(rowIndex === 0 && chartOrientation !== ChartOrientations.HORIZONTAL) && (
                                        <div className={style.matrixTableColumnHeaderTextContainer}
                                            style={{
                                                backgroundColor: columnsData[columnIndex]?.color ?? columnsColor
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedColumn(columnIndex)
                                            }}>
                                            <TextArea
                                                autoSize
                                                style={textAreaStyle}
                                                placeholder={`Column ${columnIndex + 1}`}
                                                className={style.drawingTextArea}
                                                value={columnsData[columnIndex]?.title}
                                                onChange={(e) => onColumnDataChange(e, columnIndex)}
                                                onKeyDown={onKeyDown}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default memo(MatrixChart);
