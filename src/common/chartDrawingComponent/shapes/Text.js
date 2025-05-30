import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useUpdateNodeInternals, NodeResizer } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { Input } from 'antd';

import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor } from '../utils';

import style from '../DndStyles.module.scss'
import ConnectionDot from '../customElements/ConnectionDot';
import DeleteBtn from '../customElements/DeleteBtn';

const { TextArea } = Input;

const resizerHandleStyle = { width: 6, height: 6, zIndex: 15 }

function Text({ id, selected, type, data }) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const shapeData = Shapes[type]
    const initialHeight = shapeData?.size?.height ?? 50;
    const initialWidth = shapeData?.size?.width ?? 50;

    const {
        size: sizes,
        setSize: onSizeCahnge,
        textdata: textDataState,
        onTextChange,
    } = useNodeDataStore()

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = textDataState?.find(item => item.id === id);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const fonstSize = Number(textdata?.fonstSize) || 8
    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const textColor = getRgbaColor(textdata?.textColor) || 'black'
    const textBold = textdata?.textBold || false
    const textAlign = textdata?.textAlign || 'center'

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? 'bolder' : 'normal',
        textAlign: textAlign,
    }

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
    }

    useEffect(() => {
        if (sizes.find(item => item.id === id)) return;

        if (data?.size) {
            setSize(data?.size)
        } else {
            setSize({ height: initialHeight, width: initialWidth })
        }
    }, []);

    useEffect(() => {
        if (!rotateControlRef.current) {
            return;
        }

        const selection = select(rotateControlRef.current);
        const dragHandler = drag().on('drag', (evt) => {
            const dx = evt.x - 100;
            const dy = evt.y - 100;
            const rad = Math.atan2(dx, dy);
            const deg = rad * (180 / Math.PI);
            setRotate(180 - deg);
            updateNodeInternals(id);
        });

        selection.call(dragHandler);
    }, [id, updateNodeInternals]);

    const onChange = useCallback((evt) => {
        onTextChange(id, { value: evt.target.value })
    }, []);

    const onResize = (_, size) => setSize(size);

    return (
        <div style={mainContainerStyle} className={style.customNodeContainer}>
            <NodeResizer
                isVisible={selected}
                minWidth={initialWidth * 0.5}
                minHeight={initialHeight * 0.5}
                onResize={onResize}
                handleStyle={resizerHandleStyle}
            />
            <div
                ref={rotateControlRef}
                style={{
                    display: selected ? "block" : "none",
                }}
                className={`nodrag ${style.textBtnRotate} icon-rotate1`}
            />

            {selected && <DeleteBtn nodeId={id} />}

            <ConnectionDot selected={selected} width={size?.width} height={size?.height} />

            <TextArea
                autoSize
                style={textAreaStyle}
                placeholder={type}
                className={style.drawingTextArea}
                value={textdata?.value}
                onChange={onChange}
            />
        </div>
    );
}

export default memo(Text);