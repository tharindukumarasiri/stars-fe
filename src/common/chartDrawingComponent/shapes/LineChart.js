import React, { memo, useEffect, useMemo } from 'react';
import { NodeResizer } from 'reactflow';

import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor } from '../utils';

import style from '../DndStyles.module.scss'

const resizerHandleStyle = { width: 12, height: 12 }

function LineChart({ id, selected, type }) {
    const shapeData = Shapes[type]
    const initialHeight = shapeData?.size?.height;
    const initialWidth = shapeData?.size?.width;

    const sizes = useNodeDataStore((state) => state?.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);
    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === id);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === id);
    const setSelectedNodeId = useNodeDataStore((state) => state.setSelectedNodeId);

    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || 'transparent'
    const borderColor = getRgbaColor(textdata?.borderColor) || 'black'
    const sectionBorderColor = getRgbaColor(chartData?.sectionBorderColor) || 'black'

    const lineNumber = chartData?.lineNumber || 1

    const curveNumber = chartData?.curveNumber || 1

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        borderTopColor: borderColor,
        borderRightColor: borderColor,
    }

    useEffect(() => {
        if (sizes.find(item => item.id === id)) return;

        setSize({ height: initialHeight, width: initialWidth })
    }, []);

    useEffect(() => {
        if (selected)
            setSelectedNodeId(id);
    }, [selected]);

    const onResize = (_, size) => setSize(size);

    const getLines = useMemo(() => {
        const linesArray = [];

        for (let i = 1; i < lineNumber + 1; i++) {
            let rotate = 90 / (lineNumber + 1) * i

            linesArray.push(
                <div
                    key={i}
                    className={style.lineChartLine}
                    style={{ width: size?.width * 2, transform: `rotate(${rotate + 90}deg)`, backgroundColor: borderColor }}
                />
            )
        }

        return linesArray
    }, [lineNumber, size, borderColor])

    const getCurves = useMemo(() => {
        const curvesArray = [];

        for (let i = 1; i < curveNumber + 1; i++) {
            let boxSize = size?.width / (curveNumber + 1) * i * 2

            curvesArray.push(
                <div
                    key={i}
                    className={style.lineChartCurveBox}
                    style={{
                        width: boxSize,
                        height: boxSize,
                        right: -boxSize / 2,
                        top: -boxSize / 2,
                        borderColor: sectionBorderColor,
                        backgroundColor: backgroundColor
                    }}
                />
            )
        }
        curvesArray.reverse()
        return curvesArray
    }, [curveNumber, size, sectionBorderColor, backgroundColor])


    return (
        <div className={style.lineChartContainer} style={mainContainerStyle}>
            <NodeResizer
                isVisible={selected}
                minWidth={initialHeight}
                minHeight={initialWidth}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleStyle={resizerHandleStyle}
            />
            {getLines}
            {getCurves}
        </div>
    );
}

export default memo(LineChart);