import React, { memo, useEffect, useCallback, useMemo, useState } from "react";
import { NodeResizer } from "reactflow";
import { Input } from "antd";

import { useNodeDataStore } from "../store";
import Shapes from "../ShapesData.js";
import { getRgbaColor, getGradientRgbaColor } from "../utils";

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

    const [openColorPicker, setOpenColorPicker] = useState("");
    const [focusedInput, setFocusedInput] = useState("");
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

    const matrixPadding = chartData?.matrixPadding || 2;
    const hideTools = chartData?.hideTools || false;
    const sectionBackgroundColor =
        getRgbaColor(chartData?.sectionBackgroundColor) || "#EAEAEA";
    const sectionBorderColor =
        getRgbaColor(chartData?.sectionBorderColor) || "#434343";

    const columnsCount = chartData?.columnsCount || 1;
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value });

    const columnsData = chartData?.columnsData || [];
    const setColumnsData = (value) => onChangeChartData({ columnsData: value })

    const textdata = useNodeDataStore((state) => state.textdata)?.find(
        (item) => item.id === id
    );
    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || "#E7E7BF";
    const borderColor = getRgbaColor(textdata?.borderColor) || "#434343";
    const headerBackgroundColor =
        getRgbaColor(textdata?.headerBackgroundColor) || "#d3d3d3";
    const removeHeader = chartData?.removeHeader || false;

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

    const onChangeHeader = useCallback((evt) => {
        onChangeChartData({ header: evt.target.value });
    }, []);


    const onChange = useCallback((evt) => {
        // if (!disableInput) {
        //     onTextChange(id, { value: evt.target.value });
        // }
    }, [disableInput]);

    const rowsList = useMemo(() => {
        return Array.from(Array(rowsCount));
    }, [rowsCount]);

    const columnList = useMemo(() => {
        return Array.from(Array(columnsCount));
    }, [columnsCount]);

    const onResize = (_, size) => setSize(size);

    const onColumnsCountDecrease = () =>
        setColumnsCount(columnsCount - 1 > 0 ? columnsCount - 1 : 0);
    // console.log(nodeData)

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

    const onChangeItemText = (e, section, column, row) => {
        const getRowsCount = (rowData) => {
            if (!rowData?.scrollHeight) return 1;

            if (rowData?.scrollHeight < e.target.scrollHeight)
                return rowData?.rows + 1;
            else return rowData?.rows;
        };

        if (!disableInput) {
            const newNodeData = JSON.parse(JSON.stringify(nodeData));

            const newSection = newNodeData[section] || [];
            const newColumn = newSection[column] || [];

            newColumn[row] = {
                text: e.target.value,
                color: newColumn[row] || "",
                rows: getRowsCount(newColumn[row]),
                scrollHeight: e.target.scrollHeight,
            };

            newSection[column] = newColumn;
            newNodeData[section] = newSection;

            setNodeData(newNodeData);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === " " && e.repeat) {
            setDisableInput(true);
        } else if (disableInput) {
            setDisableInput(false);
        }
    };

    const onDeleteItem = (section, column, row) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        const newSection = newNodeData[section] || [];
        const newColumn = newSection[column] || [];

        newColumn?.splice(row, 1);

        newSection[column] = newColumn;
        newNodeData[section] = newSection;

        setNodeData(newNodeData);
    };

    const onMouseLeave = () => {
        setOpenColorPicker("");
    };

    const onChangeColumnColor = (color, column) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        newNodeData?.map((section) => {
            const newColumn = section[column] || [];

            newColumn?.map((row) => {
                row.color = getGradientRgbaColor(color);
            });

            return newColumn;
        });

        setNodeData(newNodeData);
    };

    const onChangeItemColor = (color, section, column, row) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        const newSection = newNodeData[section] || [];
        const newColumn = newSection[column] || [];

        newColumn[row].color = getGradientRgbaColor(color);

        newSection[column] = newColumn;
        newNodeData[section] = newSection;

        setNodeData(newNodeData);
    };

    const deleteColumn = (column) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        newNodeData?.map((section) => {
            return section?.splice(column, 1);
        });

        setNodeData(newNodeData);
        onColumnsCountDecrease();
    };

    const onFocusInput = (e) => {
        setFocusedInput(e?.target?.id);
    };

    return (
        <div className={style.matrixTableContainer} style={mainContainerStyle}>
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
                                    style={{ marginRight: matrixPadding, marginBottom: matrixPadding, marginTop: matrixPadding }}
                                >
                                    {rowIndex === 0 && (
                                        <div className={style.matrixTableColumnHeaderTextContainer}>
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
