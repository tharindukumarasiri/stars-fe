import React from "react"
import { Handle, Position, useStore } from 'reactflow';

import style from '../DndStyles.module.scss'

const ConnectionDot = ({ selected }) => {
    const connectionNodeIdSelector = (state) => state.connectionNodeId;

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;

    if (!(selected || isConnecting))
        return null;

    return (
        <>
            <Handle
                type="source"
                position={Position.Top}
                id="top"
                className={style.handle}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="left"
                className={style.handle}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom"
                className={style.handle}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                className={style.handle}
            />
        </>
    )
}

export default ConnectionDot