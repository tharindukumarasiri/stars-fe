import React, { memo, useEffect, useCallback, useMemo, useState } from "react";
import { NodeResizer } from "reactflow";

import { useNodeDataStore } from "../store";
import Shapes from "../ShapesData.js";
import { getRgbaColor, getGradientRgbaColor } from "../utils";
import ColorPicker from "../../../common/colorPicker";

import style from "../DndStyles.module.scss";

//Bellow is the data structure of nodeData
// { sectionId } = {
//     cols: 3,
//     elementData: [
//         [{ text: 'row1 col1' }],
//         [{ text: 'row2 col1' }],
//     ]
// }

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

    const matrixPadding = chartData?.matrixPadding || 2;
    const hideTools = chartData?.hideTools || false;
    const sectionBackgroundColor =
        getRgbaColor(chartData?.sectionBackgroundColor) || "#EAEAEA";
    const sectionBorderColor =
        getRgbaColor(chartData?.sectionBorderColor) || "#434343";

    const columnsCount = chartData?.columnsCount || 1;
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value });
    const columnsData = chartData?.columnsData || [];

    const textdata = useNodeDataStore((state) => state.textdata)?.find(
        (item) => item.id === id
    );
    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || "#E7E7BF";
    const borderColor = getRgbaColor(textdata?.borderColor) || "#434343";
    const headerBackgroundColor =
        getRgbaColor(textdata?.headerBackgroundColor) || "#d3d3d3";
    const removeHeader = chartData?.removeHeader || false;

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
                        <div className={style.matrixTableRowHeader} key={rowIndex + 'guide'}>
                            <div className={style.matrixTableRowLine}>
                                <i className={`arrow arrowUp ${style.matrixTableArrow}`} />
                                <i
                                    className={`arrow arrowDown ${style.matrixTableArrow} ${style.matrixTableArrowDown}`}
                                />
                            </div>
                            <div className={style.matrixTableRowLineContainer}>
                                <div
                                    className={style.matrixTableRowHeaderText + " white"}
                                >{`Row`}</div>
                            </div>
                        </div>
                        <div
                            className={style.matrixTableRowHeader}
                            style={{ padding: matrixPadding }}
                            key={rowIndex + 'title'}
                        >
                            <div className={style.matrixTableRowHeaderTextContainer}>
                                <div className={style.matrixTableRowHeaderText}>
                                    {rowsData[rowIndex]}
                                </div>
                            </div>
                        </div>
                        {columnList.map((_, columnIndex) => {
                            const sectionData = nodeData[sectionNumber] || {};
                            const elementList = Array.from(Array(sectionData?.columnsCount ?? 0))
                            sectionNumber++

                            return (
                                <div
                                    key={sectionNumber}
                                    style={{
                                        margin: matrixPadding,
                                        outlineOffset: matrixPadding,
                                    }}
                                    className={style.matrixTableSection}
                                >
                                    {rowIndex === 0 && (
                                        <div className={style.matrixTableColumnHeaderTextContainer}>
                                            <div className={style.matrixTableRowLineHorizontal}>
                                                <i className={`arrow arrowLeft ${style.matrixTableArrow} ${style.matrixTableArrowLeft}`} />
                                                <i
                                                    className={`arrow arrowRight ${style.matrixTableArrow} ${style.matrixTableArrowRight}`}
                                                />

                                            </div>
                                            <div className={style.matrixTableRowLineHorizontalText}>
                                                <div>{`Column ${columnIndex + 1}`}</div>
                                            </div>
                                            {columnsData[columnIndex]}
                                        </div>
                                    )}
                                    <div className={style.sectionNumberContainer}>
                                        {sectionNumber.toString().padStart(2, '0')}
                                    </div>

                                    <div className={style.matrixTableSectionContainer} style={{
                                        margin: matrixPadding,
                                    }}>
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


                                    {/* {rowsdata?.map((item, rowIndex) => {
                                        const rowId = `${rowIndex}${columnIndex}${rowIndex}`;

                                        return (
                                            <div
                                                className={style.matrixTableItem}
                                                style={{ backgroundImage: item?.color, margin: matrixPadding }}
                                                key={rowId}
                                            >
                                                {rowId === focusedInput && !hideTools && (
                                                    <>
                                                        <i
                                                            className={
                                                                style.matrixItemClose + " icon-close-small-x"
                                                            }
                                                            onClick={() =>
                                                                onDeleteItem(rowIndex, columnIndex, rowIndex)
                                                            }
                                                        />
                                                        <i
                                                            className={
                                                                style.matrixItemClose +
                                                                " icon-paint-bucket m-t-15"
                                                            }
                                                            onClick={() => setOpenColorPicker(rowId)}
                                                        />

                                                        {rowId === openColorPicker && (
                                                            <ColorPicker
                                                                color={item?.color || "lightcoral"}
                                                                onChange={(color) =>
                                                                    onChangeItemColor(
                                                                        color?.rgb,
                                                                        rowIndex,
                                                                        columnIndex,
                                                                        rowIndex
                                                                    )
                                                                }
                                                                onMouseLeave={onMouseLeave}
                                                                reduced
                                                                styles={{ top: 30, left: 80 }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                                <textarea
                                                    key={rowId}
                                                    onFocus={onFocusInput}
                                                    placeholder="Element"
                                                    className={style.matrixItemText}
                                                    value={item?.text}
                                                    onChange={(e) =>
                                                        onChangeItemText(e, rowIndex, columnIndex, rowIndex)
                                                    }
                                                    multiple
                                                    onKeyDown={onKeyDown}
                                                    rows={item?.rows || 1}
                                                />
                                            </div>
                                        );
                                    })} */}
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
