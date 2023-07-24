import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, NodeResizer, useStore } from 'reactflow';

import { useTextStore } from './store'
import Shapes from './Shapes.js';

import style from './DndStyles.module.scss'

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const sourceStyle = { zIndex: 2 };
const targetStyle = { zIndex: 1 };

function CustomNode({ id, selected, type }) {
    const [size, setSize] = useState({ height: 50, width: 50 });

    const textdata = useTextStore((state) => state.textdata);
    const onTextChange = useTextStore((state) => state.onTextChange);
    const setSelectedNodeId = useTextStore((state) => state.setSelectedNodeId);

    const connectionNodeId = useStore(connectionNodeIdSelector);

    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const fonstSize = Number(textdata.find(item => item.id === id)?.fonstSize?.[0]) || 8
    const backgroundColor = textdata.find(item => item.id === id)?.backgroundColor?.[0] || ''
    const textType = textdata.find(item => item.id === id)?.textType?.[0] || { label: 'Poppins', type: 'Poppins' }
    const textColor = textdata.find(item => item.id === id)?.textColor?.[0] || 'black'
    const textBold = textdata.find(item => item.id === id)?.textBold?.[0] || false

    useEffect(() => {
        if (selected)
            setSelectedNodeId(id);
    }, [selected]);

    const CustomShape = ({ fill }) => {
        return (
            <svg viewBox={Shapes[type]?.viewBox} fill={fill} width={size.width} height={size.height}>
                {Shapes[type].image}
            </svg>
        )
    }

    const onChange = useCallback((evt) => {
        onTextChange(id, { value: evt.target.value })
    }, []);

    const onResize = (_, size) => setSize(size)

    return (
        <div style={{ height: size.height, width: size.width }} className={style.customNodeContainer} >
            <NodeResizer isVisible={selected} minWidth={50} minHeight={50} onResizeEnd={onResize} keepAspectRatio />
            <CustomShape fill={backgroundColor} />
            <div style={{ visibility: selected || isTarget ? 'visible' : 'hidden' }}>
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
                style={{
                    fontFamily: textType.type,
                    fontSize: fonstSize,
                    color: textColor,
                    fontWeight: textBold ? 'bolder' : 'normal',
                }}
            />
        </div>
    );
}

export default memo(CustomNode);