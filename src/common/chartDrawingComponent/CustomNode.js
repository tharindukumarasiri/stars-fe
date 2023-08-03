import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, NodeResizer, useStore } from 'reactflow';

import { useTextStore } from './store'
import Shapes from './Shapes.js';

import style from './DndStyles.module.scss'

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const sourceStyle = { zIndex: 2 };
const targetStyle = { zIndex: 1 };

function CustomNode({ id, selected, type, data }) {
    const shapeData = Shapes[type]
    const initialHeight = shapeData.size?.height ?? 50;
    const initialWidth = shapeData.size?.width ?? 50;

    const [size, setSize] = useState({ height: initialHeight, width: initialWidth });

    const textdata = useTextStore((state) => state.textdata);
    const onTextChange = useTextStore((state) => state.onTextChange);
    const setSelectedNodeId = useTextStore((state) => state.setSelectedNodeId);

    const connectionNodeId = useStore(connectionNodeIdSelector);

    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const handleContainerStyle = !((selected || isTarget) && type !== 'Table') ? style.handleHidden : '';

    const fonstSize = Number(textdata.find(item => item.id === id)?.fonstSize?.[0]) || 8
    const backgroundColor = textdata.find(item => item.id === id)?.backgroundColor?.[0] || '#ffffff'
    const borderColor = textdata.find(item => item.id === id)?.borderColor?.[0] || 'black'
    const textType = textdata.find(item => item.id === id)?.textType?.[0] || { label: 'Poppins', type: 'Poppins' }
    const textColor = textdata.find(item => item.id === id)?.textColor?.[0] || 'black'
    const textBold = textdata.find(item => item.id === id)?.textBold?.[0] || false
    const markerType = textdata.find(item => item.id === id)?.markerType?.[0] || { label: '', icon: '' }

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? 'bolder' : 'normal',
    }

    useEffect(() => {
        if (selected)
            setSelectedNodeId(id);
    }, [selected]);

    const CustomShape = ({ fill }) => {
        return (
            <svg viewBox={shapeData.viewBox} fill={fill} stroke={borderColor} width={size.width} height={size.height} >
                {Shapes[type].image}
            </svg >
        )
    }

    const onChange = useCallback((evt) => {
        onTextChange(id, { value: evt.target.value })
    }, []);

    const onResize = (_, size) => setSize(size);
    const onDeleteNode = () => data.setDeleteNodeId(id);

    return (
        <div style={{ height: size.height, width: size.width }} className={style.customNodeContainer} >
            <NodeResizer isVisible={selected} minWidth={initialWidth} minHeight={initialHeight} onResizeEnd={onResize} keepAspectRatio />
            {markerType?.icon &&
                <i className={markerType.icon + ' ' + style.activityIcon} style={{ top: size.height / 50, left: size.height / 50 }} />
            }
            {selected &&
                <i className={style.nodeCloseBtn + " icon-close-small-x"} onClick={onDeleteNode} />
            }

            <CustomShape fill={backgroundColor} />
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
            <textarea
                id="textarea"
                type="textarea"
                name="textarea"
                placeholder={type}
                className={style.drawingTextArea}
                value={textdata.find(item => item.id === id)?.value}
                onChange={onChange}
                multiple
                style={textAreaStyle}
            />
        </div>
    );
}

export default memo(CustomNode);