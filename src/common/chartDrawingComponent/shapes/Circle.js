import React, { memo, useCallback, useEffect, useState } from 'react';
import { Handle, Position, NodeResizer, useStore } from 'reactflow';

import { useTextStore } from '../store'

import style from '../DndStyles.module.scss'

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const sourceStyle = { zIndex: 1 };

function Circle({ id, selected }) {
    const [size, setSize] = useState({ height: 60, width: 60 });

    const textdata = useTextStore((state) => state.textdata);
    const onTextChange = useTextStore((state) => state.onTextChange);
    const setSelectedNodeId = useTextStore((state) => state.setSelectedNodeId);

    const connectionNodeId = useStore(connectionNodeIdSelector);

    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const fonstSize = Number(textdata.find(item => item.id === id)?.fonstSize) || 8
    const backgroundColor = textdata.find(item => item.id === id)?.backgroundColor || ''
    const textColor = textdata.find(item => item.id === id)?.textColor || 'black'

    useEffect(() => {
        if (selected)
            setSelectedNodeId(id);
    }, [selected])

    const onChange = useCallback((evt) => {
        onTextChange(id, { value: evt.target.value })
    }, []);

    const onResize = (_, size) => setSize(size)

    return (
        <div className={style.circle} style={{ height: size.height, width: size.width, backgroundColor: backgroundColor }}>
            <NodeResizer isVisible={selected} minWidth={60} minHeight={60} onResizeEnd={onResize} keepAspectRatio />
            <div style={{ visibility: selected || isTarget ? 'visible' : 'hidden' }}>
                {!isConnecting && (
                    <Handle
                        className={isTarget ? style.customHandle : style.customHandle2}
                        position={Position.Right}
                        type="source"
                        style={sourceStyle}
                    />
                )}

                <Handle className={isTarget ? style.customHandle : style.customHandle2} position={Position.Left} type="target" />
            </div>
            <textarea
                id="textarea"
                type="textarea"
                name="textarea"
                placeholder='Circle'
                className={style.drawingTextArea}
                value={textdata.find(item => item.id === id)?.value}
                onChange={onChange}
                multiple
                style={{ height: size.height * 0.5, width: size.width * 0.8, fontSize: fonstSize, color: textColor }}
            />
        </div>
    );
}

export default memo(Circle);