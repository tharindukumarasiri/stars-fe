import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeResizer, useStore } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor } from '../utils';

import style from '../DndStyles.module.scss'

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const sourceStyle = { zIndex: 2 };
const targetStyle = { zIndex: 1 };
const resizerHandleStyle = { width: 6, height: 6 }

function CustomNode({ id, selected, type, data }) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const shapeData = Shapes[type]
    const initialHeight = shapeData.size?.height ?? 50;
    const initialWidth = shapeData.size?.width ?? 50;
    const isTable = type === 'Table';

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const handleContainerStyle = (!((selected || isTarget) && !isTable) || data?.hideHandle) ? style.handleHidden : '';

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const setSelectedNodeId = useNodeDataStore((state) => state.setSelectedNodeId);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const fonstSize = Number(textdata?.fonstSize) || 8
    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || '#ffffff'
    const borderColor = getRgbaColor(textdata?.borderColor) || 'black'
    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const textColor = getRgbaColor(textdata?.textColor) || 'black'
    const textBold = textdata?.textBold || false
    const markerType = textdata?.markerType || { label: '', icon: '' }

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? 'bolder' : 'normal',
    }

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: shapeData?.hideShape ? backgroundColor : '',
        borderColor: shapeData?.hideShape ? borderColor : '',
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
        if (selected)
            setSelectedNodeId(id);
    }, [selected]);

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

    const CustomShape = ({ fill }) => {
        return (
            <svg viewBox={shapeData.viewBox} fill={fill} stroke={borderColor} width={size?.width} height={size?.height} >
                {Shapes[type].image}
            </svg >
        )
    }

    const onChange = useCallback((evt) => {
        onTextChange(id, { value: evt.target.value })
    }, []);

    const onResize = (_, size) => setSize(size);

    const onDeleteNode = () => data.setDeleteNodeId(id);

    const addVerticalLine = () => {
        data.addTableLine('VerticalLine', id, { height: size?.height }, { x: 20, y: 0 })
    }

    const addHorizontalLine = () => {
        data.addTableLine('HorizontalLine', id, { width: size?.width }, { x: 0, y: 20 })
    }

    return (
        <div style={mainContainerStyle}
            className={isTable ? style.tableContainer : style.customNodeContainer}
        >
            <NodeResizer
                isVisible={selected}
                minWidth={initialWidth * 0.5}
                minHeight={initialHeight * 0.5}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleStyle={resizerHandleStyle}
            />
            <div
                ref={rotateControlRef}
                style={{
                    display: selected ? 'block' : 'none',
                }}
                className={`nodrag ${style.rotateHandle}`}
            />

            {markerType?.icon &&
                <i className={markerType.icon + ' ' + style.activityIcon} style={{ top: size?.height / 50, left: size?.height / 50 }} />
            }
            {selected &&
                <i className={style.nodeCloseBtn + " icon-close-small-x"} onClick={onDeleteNode} />
            }

            {selected && isTable &&
                <button className={style.tableBtnHorizontal} onClick={addVerticalLine} >Vertical line</button>
            }
            {selected && isTable &&
                <button className={style.tableBtnVertical} onClick={addHorizontalLine} >Horizontal line</button>
            }

            {!shapeData?.hideShape &&
                <CustomShape fill={backgroundColor} />
            }

            <div className={handleContainerStyle}>
                {!isConnecting && (
                    <Handle
                        className={isTarget ? style.customHandle : style.customHandle2}
                        position={Position.Right}
                        type="source"
                        style={sourceStyle}
                    />
                )}
                <Handle className={isTarget ? style.customHandle : style.customHandle2} position={Position.Left} type="target" style={targetStyle} />
            </div>
            {!shapeData?.hideTextInput ?
                <textarea
                    id="textarea"
                    type="textarea"
                    name="textarea"
                    placeholder={type}
                    className={style.drawingTextArea}
                    value={textdata?.value}
                    onChange={onChange}
                    multiple
                    style={textAreaStyle}
                /> : null
            }
        </div>
    );
}

export default memo(CustomNode);