import React, { memo, useEffect, useMemo, useState } from "react";
import { NodeResizer } from "reactflow";
import { Input } from "antd";

import { useNodeDataStore } from "../store";
import Shapes from "../ShapesData.js";
import { getRgbaColor } from "../utils";

import style from "../DndStyles.module.scss";

const { TextArea } = Input;

function MatrixChart({ id, selected, type, data }) {
    const shapeData = Shapes[type];
    const initialHeight = shapeData.size?.height;
    const initialWidth = shapeData.size?.width;

    let sectionNumber = 0

    const setSelectedNodeId = useNodeDataStore(
        (state) => state.setSelectedNodeId
    );

    const [disableInput, setDisableInput] = useState(false);

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find((item) => item.id === id) || {
        height: initialHeight,
        width: initialWidth,
    };
    const setSize = (value) => onSizeCahnge(id, value);

    const chartData = useNodeDataStore((state) => state.chartData).find(
        (item) => item.id === id
    );
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const onChangeChartData = (value) => changeChartData(id, value);

    const nodeData = chartData?.nodeData || [];
    const setNodeData = (value) => onChangeChartData({ nodeData: value });

    const rowsCount = chartData?.rowsCount || 1;

    const rowsData = chartData?.rowsData || [];
    const setRowsData = (value) => onChangeChartData({ rowsData: value })

    const selectedColumn = chartData?.selectedColumn ?? null;
    const setSelectedColumn = (value) => onChangeChartData({ selectedColumn: value, selectedRow: null })

    const selectedRow = chartData?.selectedRow ?? null;
    const setSelectedRow = (value) => onChangeChartData({ selectedRow: value, selectedColumn: null })

    const matrixPadding = chartData?.matrixPadding || 2;
    const hideTools = chartData?.hideTools || false;

    const columnsCount = chartData?.columnsCount || 1;
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value });

    const columnsData = chartData?.columnsData || [];
    const setColumnsData = (value) => onChangeChartData({ columnsData: value })

    const textdata = useNodeDataStore((state) => state.textdata)?.find(
        (item) => item.id === id
    );

    const onColumnDataChange = (e, index) => {
        const copyOfColumnsData = [...columnsData]
        copyOfColumnsData[index] = e.target.value
        setColumnsData(copyOfColumnsData)
    }

    const onRowsDataChange = (e, index) => {
        const copyOfRowsData = [...rowsData]
        copyOfRowsData[index] = e.target.value
        setRowsData(copyOfRowsData)
    }


    const fonstSize = Number(textdata?.fonstSize) || 8;
    const textType = textdata?.textType || { label: "Poppins", type: "Poppins" };
    const textColor = getRgbaColor(textdata?.textColor) || "black";
    const textBold = textdata?.textBold || false;

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
    };

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? "bolder" : "normal",
    };

    useEffect(() => {
        if (sizes.find((item) => item.id === id)) return;

        setSize({ height: initialHeight, width: initialWidth });
    }, []);

    useEffect(() => {
        if (selected) setSelectedNodeId(id);
    }, [selected]);

    const rowsList = useMemo(() => {
        return Array.from(Array(rowsCount));
    }, [rowsCount]);

    const columnList = useMemo(() => {
        return Array.from(Array(columnsCount));
    }, [columnsCount]);

    const onResize = (_, size) => setSize(size);

    const addNewItem = (sectionNumber, elementColIndex) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));
        const sectionData = newNodeData[sectionNumber]
        const allElementsData = sectionData?.elementData ?? []

        const elementsColumnData = allElementsData[elementColIndex] ?? []

        elementsColumnData.push({ text: '' })

        allElementsData[elementColIndex] = elementsColumnData
        sectionData.elementData = allElementsData
        newNodeData[sectionNumber] = sectionData

        setNodeData(newNodeData);
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
            if (selectedColumn !== null)
                setSelectedColumn(null)
        }}>
            <NodeResizer
                isVisible={selected}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleClassName={style.resizerHandleStyle}
            />

            {rowsList.map((_, rowIndex) => {
                return (
                    <div className={style.matrixTableMainRow} key={rowIndex + 'main'}>
                        <div
                            className={style.matrixTableRowHeader}
                            key={rowIndex + 'title'}
                            style={{ paddingTop: matrixPadding, paddingBottom: matrixPadding }}
                        >
                            <div className={style.matrixTableRowHeaderTextContainer}>
                                {/* {rowsData[rowIndex]} */}
                                <TextArea
                                    autoSize
                                    style={{
                                        ...textAreaStyle, ...{
                                            transform: 'rotate(270deg)'
                                        }
                                    }}
                                    placeholder={`Row ${rowIndex + 1}`}
                                    className={style.drawingTextArea}
                                    value={rowsData[rowIndex]}
                                    onChange={(e) => onRowsDataChange(e, rowIndex)}
                                    onKeyDown={onKeyDown}
                                />
                            </div>
                        </div>
                        {columnList.map((_, columnIndex) => {
                            const sectionData = nodeData[sectionNumber] || {};
                            const elementList = Array.from(Array(sectionData?.columnsCount ?? 0))
                            sectionNumber++

                            return (
                                <div
                                    key={sectionNumber}
                                    className={style.matrixTableSection}
                                    style={{
                                        marginRight: matrixPadding, marginBottom: matrixPadding, marginTop: matrixPadding,
                                        ...(selectedColumn === columnIndex ?
                                            {
                                                borderLeftColor: 'blue', borderRightColor: 'blue',
                                                ...(rowIndex === 0 ? { borderTopColor: 'blue' } : {}),
                                                ...(rowIndex === rowsList.length - 1 ? { borderBottomColor: 'blue' } : {})
                                            }
                                            : {})
                                    }}
                                >
                                    {rowIndex === 0 && (
                                        <div className={style.matrixTableColumnHeaderTextContainer}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedColumn(columnIndex)
                                            }}>
                                            <TextArea
                                                autoSize
                                                style={textAreaStyle}
                                                placeholder={`Column ${columnIndex + 1}`}
                                                className={style.drawingTextArea}
                                                value={columnsData[columnIndex]}
                                                onChange={(e) => onColumnDataChange(e, columnIndex)}
                                                onKeyDown={onKeyDown}
                                            />
                                        </div>
                                    )}

                                    <div className={style.matrixTableSectionContainer}>
                                        {elementList?.map((_, elementColIndex) => {
                                            return (
                                                <div className={style.matrixElementColumnContainer} key={`${sectionNumber} ${elementColIndex}`} >
                                                    {sectionData?.elementData?.[elementColIndex] ?
                                                        sectionData?.elementData?.[elementColIndex]?.map((element, elementIndex) => {
                                                            return (
                                                                <div key={elementIndex} className={style.matrixTableItem}>{element?.text}</div>
                                                            )
                                                        })
                                                        : null
                                                    }
                                                    {!hideTools && (
                                                        <div className={style.matrixAddNewItemContainer}>
                                                            <div
                                                                className={style.matrixAddNewItem}
                                                                onClick={() => addNewItem(sectionData.sectionNumber, elementColIndex)}
                                                            >
                                                                +
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
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
