import React, { memo, useCallback, useState } from 'react';
import { Handle, Position, NodeResizer, useStore } from 'reactflow';

import { useTextStore } from '../store'

import style from '../DndStyles.module.scss'

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const sourceStyle = { zIndex: 1 };

const Rectangle = ({ id, selected }) => {
    const [inputSize, setInputSize] = useState({ height: 30, width: 80 });

    const textdata = useTextStore((state) => state.textdata);
    const onTextChange = useTextStore((state) => state.onTextChange);

    const connectionNodeId = useStore(connectionNodeIdSelector);

    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const onChange = useCallback((evt) => {
        onTextChange(id, evt.target.value)
    }, []);

    const onResize = (_, size) => {
        setInputSize({ height: size.height * 0.5, width: size.width * 0.8 })
    }

    return (
        <>
            <NodeResizer isVisible={selected} minWidth={80} minHeight={30} onResizeEnd={onResize} />
            {!isConnecting && (
                <Handle
                    className={isTarget ? style.customHandle : style.customHandle2}
                    position={Position.Right}
                    type="source"
                    style={sourceStyle}
                />
            )}
            <Handle className={isTarget ? style.customHandle : style.customHandle2} position={Position.Left} type="target" />
            <textarea
                id="textarea"
                type="textarea"
                name="textarea"
                placeholder='Rectangle'
                className={style.drawingTextArea}
                value={textdata.find(item => item.id === id)?.value}
                onChange={onChange}
                multiple
                style={inputSize}
            />
        </>
    );
};

export default memo(Rectangle);
