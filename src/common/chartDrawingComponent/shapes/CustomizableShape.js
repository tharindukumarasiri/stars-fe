import React, { memo, useState, useRef } from 'react';
import { NodeResizer } from 'reactflow';

import ConnectionDot from '../customElements/ConnectionDot';
import style from '../DndStyles.module.scss'
import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor } from '../utils';

const resizerHandleStyle = { width: 6, height: 6 }

function CustomizableShape({ id, selected, type, data }) {
    const rotateControlRef = useRef(null);

    const shapeData = Shapes[type]
    const initialHeight = shapeData?.size?.height ?? 100;
    const initialWidth = shapeData?.size?.width ?? 100;

    const sizes = useNodeDataStore((state) => state?.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const setSelectedNodeId = useNodeDataStore((state) => state.setSelectedNodeId);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || '#ffffff'
    const borderColor = getRgbaColor(textdata?.borderColor) || 'black'

    const mainContainerStyle = {
        position: "relative",
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: shapeData?.hideShape ? backgroundColor : '',
        borderColor: shapeData?.hideShape ? borderColor : '',
    }

    const [points, setPoints] = useState([
        { x: 50, y: 0 }, // Top point
        { x: 100, y: 100 }, // Bottom-right
        { x: 0, y: 100 }, // Bottom-left
    ]);


    const handleDrag = (index, event) => {
        const newPoints = [...points];
        newPoints[index] = {
            x: event.clientX - event.target.parentElement.getBoundingClientRect().left,
            y: event.clientY - event.target.parentElement.getBoundingClientRect().top,
        };
        setPoints(newPoints);
    };

    const pointsString = points.map((p) => `${p.x},${p.y}`).join(" ");

    const onResize = (_, size) => setSize(size);

    return (
        <div style={mainContainerStyle}
            className={style.customNodeContainer}
        >
            <NodeResizer
                isVisible={selected}
                minWidth={initialWidth * 0.5}
                minHeight={initialHeight * 0.5}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleStyle={resizerHandleStyle}
            />

            <i ref={rotateControlRef}
                style={{
                    display: selected ? 'block' : 'none',
                }}
                className={`nodrag ${style.textBtnRotate} icon-rotate1`}
            />

            <svg width={size.width} height={size.height}>
                <polygon
                    points={pointsString}
                    fill={backgroundColor}
                    stroke="blue"
                    strokeWidth="2"
                />
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="5"
                        fill="red"
                        style={{ cursor: "pointer" }}
                        onMouseDown={(e) => e.stopPropagation()} // Prevent node drag
                        onMouseMove={(e) => handleDrag(index, e)}
                    />
                ))}
            </svg>

            <ConnectionDot />

        </div>
    );
}

export default memo(CustomizableShape);