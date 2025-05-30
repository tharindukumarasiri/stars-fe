import React, { memo, useEffect, useCallback, useMemo, useState } from 'react';
import { NodeResizer } from 'reactflow';

import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor, getGradientRgbaColor } from '../utils';
import ColorPicker from '../../../common/colorPicker';

import style from '../DndStyles.module.scss'

//Bellow is the data structure of nodeData
// nodeData = [
//     [// section 1
//         [ //column 1
//             { text: 'Aaa' }, // row 1
//             { text: 'Bbb' }, //row 2
//         ],
//         [ //column 2
//             { text: 'Bob' }, // row 1
//             { text: 'sam' }, //row 2
//             { text: 'fam' }, //row 3
//         ]
//     ],
// ];

function MatrixChart({ id, selected, type, data }) {
    const shapeData = Shapes[type]
    const initialHeight = shapeData?.size?.height;
    const initialWidth = shapeData?.size?.width;


    const [openColorPicker, setOpenColorPicker] = useState('');
    const [focusedInput, setFocusedInput] = useState('')
    const [disableInput, setDisableInput] = useState(false)

    const {
        size: sizes,
        setSize: onSizeCahnge,
        textdata: textDataState,
        chartData: chartDataState,
        setChartData: changeChartData,
    } = useNodeDataStore()

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const chartData = chartDataState.find(item => item.id === id);
    const onChangeChartData = (value) => changeChartData(id, value)

    const nodeData = chartData?.nodeData || []
    const setNodeData = (value) => onChangeChartData({ nodeData: value })

    const sectionsCount = chartData?.sectionsCount || 1
    const hideTools = chartData?.hideTools || false
    const sectionBackgroundColor = getRgbaColor(chartData?.sectionBackgroundColor) || '#EAEAEA'
    const sectionBorderColor = getRgbaColor(chartData?.sectionBorderColor) || '#434343'

    const columnsCount = chartData?.columnsCount || 1
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value })

    const textdata = textDataState?.find(item => item.id === id);
    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || '#E7E7BF'
    const borderColor = getRgbaColor(textdata?.borderColor) || '#434343'
    const headerBackgroundColor = getRgbaColor(textdata?.headerBackgroundColor) || '#d3d3d3'
    const removeHeader = chartData?.removeHeader || false

    const fonstSize = Number(textdata?.fonstSize) || 8
    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const textColor = getRgbaColor(textdata?.textColor) || 'black'
    const textBold = textdata?.textBold || false

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        backgroundColor: backgroundColor,
    }

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? 'bolder' : 'normal',
    }

    useEffect(() => {
        if (sizes.find(item => item.id === id)) return;

        setSize({ height: initialHeight, width: initialWidth })
    }, []);

    const onChangeHeader = useCallback((evt) => {
        onChangeChartData({ header: evt.target.value })
    }, []);

    const sectionList = useMemo(() => {
        return (
            Array.from(Array(sectionsCount))
        )
    }, [sectionsCount])

    const columnList = useMemo(() => {
        return (
            Array.from(Array(columnsCount))
        )
    }, [columnsCount])

    const onResize = (_, size) => setSize(size);

    const onColumnsCountDecrease = () => setColumnsCount(columnsCount - 1 > 0 ? columnsCount - 1 : 0);

    const addNewItem = (section, column) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        const newSection = newNodeData[section] || [];
        const newColumn = newSection[column] || [];

        newColumn.push({ text: '', color: newColumn[0]?.color || '' })

        newSection[column] = newColumn
        newNodeData[section] = newSection;

        setNodeData(newNodeData)
    }

    const onChangeItemText = (e, section, column, row) => {
        const getRowsCount = (rowData) => {
            if (!rowData?.scrollHeight)
                return 1

            if (rowData?.scrollHeight < e.target.scrollHeight)
                return rowData?.rows + 1
            else
                return rowData?.rows
        }

        if (!disableInput) {
            const newNodeData = JSON.parse(JSON.stringify(nodeData));

            const newSection = newNodeData[section] || [];
            const newColumn = newSection[column] || [];

            newColumn[row] = { text: e.target.value, color: newColumn[row] || '', rows: getRowsCount(newColumn[row]), scrollHeight: e.target.scrollHeight }

            newSection[column] = newColumn
            newNodeData[section] = newSection;

            setNodeData(newNodeData)
        }
    }

    const onKeyDown = (e) => {
        if (e.key === " " && e.repeat) {
            setDisableInput(true);
        } else if (disableInput) {
            setDisableInput(false);
        }
    }

    const onDeleteItem = (section, column, row) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        const newSection = newNodeData[section] || [];
        const newColumn = newSection[column] || [];

        newColumn?.splice(row, 1)

        newSection[column] = newColumn
        newNodeData[section] = newSection;

        setNodeData(newNodeData)
    }

    const onMouseLeave = () => {
        setOpenColorPicker('')
    }

    const onChangeColumnColor = (color, column) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        newNodeData?.map(section => {
            const newColumn = section[column] || [];

            newColumn?.map(row => {
                row.color = getGradientRgbaColor(color)
            })

            return newColumn
        })

        setNodeData(newNodeData)
    }

    const onChangeItemColor = (color, section, column, row) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        const newSection = newNodeData[section] || [];
        const newColumn = newSection[column] || [];

        newColumn[row].color = getGradientRgbaColor(color);

        newSection[column] = newColumn;
        newNodeData[section] = newSection;

        setNodeData(newNodeData);
    }

    const deleteColumn = (column) => {
        const newNodeData = JSON.parse(JSON.stringify(nodeData));

        newNodeData?.map(section => {
            return section?.splice(column, 1)
        })

        setNodeData(newNodeData);
        onColumnsCountDecrease();
    };

    const onFocusInput = (e) => {
        setFocusedInput(e?.target?.id)
    }

    return (
        <div className={style.matrixChartContainer} style={mainContainerStyle}>
            <NodeResizer
                isVisible={selected}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleClassName={style.resizerHandleStyle}
            />

            {!removeHeader &&
                <div className={style.matrixChartHeader} style={{ backgroundColor: headerBackgroundColor, borderColor: borderColor }}>
                    <textarea
                        id="textarea"
                        type="textarea"
                        name="textarea"
                        placeholder='Title'
                        className={style.matrixChartHeaderText}
                        value={chartData?.header}
                        onChange={onChangeHeader}
                        multiple
                        style={textAreaStyle}
                    />
                </div>
            }

            {sectionList.map((_, sectionIndex) => {
                return (
                    <div className={style.matrixChartSection} id={sectionIndex} style={{ backgroundColor: sectionBackgroundColor, borderColor: sectionBorderColor }}>
                        {columnList.map((_, columnIndex) => {
                            const sectiondata = nodeData[sectionIndex] || [];
                            const rowsdata = sectiondata[columnIndex] || [];
                            const columnId = `${sectionIndex}${columnIndex}`

                            return (
                                <div id={columnId}>
                                    {rowsdata?.map((item, rowIndex) => {
                                        const rowId = `${sectionIndex}${columnIndex}${rowIndex}`;

                                        return (
                                            <div
                                                className={`${style.matrixChartItem} ${sectiondata?.some(section => section?.length > 1) ? {} : style.matrixChartItemLarge}`}
                                                style={{ backgroundImage: item?.color }}
                                                id={rowId}>
                                                {rowId === focusedInput && !hideTools &&
                                                    <>
                                                        <i className={style.matrixItemClose + " icon-close-small-x"}
                                                            onClick={() => onDeleteItem(sectionIndex, columnIndex, rowIndex)}
                                                        />
                                                        <i className={style.matrixItemClose + ' icon-paint-bucket m-t-15'} onClick={() => setOpenColorPicker(rowId)} />

                                                        {rowId === openColorPicker &&
                                                            <ColorPicker
                                                                color={item?.color || 'lightcoral'}
                                                                onChange={(color) => onChangeItemColor(color?.rgb, sectionIndex, columnIndex, rowIndex)}
                                                                onMouseLeave={onMouseLeave}
                                                                reduced
                                                                styles={{ top: 30, left: 80 }}
                                                            />
                                                        }
                                                    </>

                                                }
                                                <textarea
                                                    id={rowId}
                                                    onFocus={onFocusInput}
                                                    placeholder='Name'
                                                    className={style.matrixItemText}
                                                    value={item?.text}
                                                    onChange={(e) => onChangeItemText(e, sectionIndex, columnIndex, rowIndex)}
                                                    multiple
                                                    onKeyDown={onKeyDown}
                                                    rows={item?.rows || 1}
                                                />
                                            </div>
                                        )
                                    })
                                    }
                                    <div className={style.matrixToolbarContainer}>
                                        {!hideTools &&
                                            <div>
                                                <div className={style.matrixAddNewItem}
                                                    onClick={() => addNewItem(sectionIndex, columnIndex)}
                                                >
                                                    +
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
            {!hideTools &&
                <div className={style.matrixColorPickerRow}>
                    {columnList?.map((_, columnId) => {
                        return (
                            <div className={style.matrixColumnActionRow}>
                                <div onClick={() => setOpenColorPicker(columnId)}>
                                    <i className={style.matrixPaintBucket + ' icon-paint-bucket'} />
                                    {columnId === openColorPicker &&
                                        <ColorPicker
                                            color={nodeData?.[0][columnId]?.[0]?.color || 'lightcoral'}
                                            onChange={(color) => onChangeColumnColor(color?.rgb, columnId)}
                                            onMouseLeave={onMouseLeave}
                                            reduced
                                        />
                                    }
                                </div>

                                <i className={style.matrixPaintBucket + ' icon-delete'}
                                    onClick={() => deleteColumn(columnId)} />
                            </div>
                        )
                    })
                    }
                </div>
            }
        </div >
    );
}

export default memo(MatrixChart);