import React from "react"
import { Handle, Position } from 'reactflow';

import style from '../DndStyles.module.scss'

const ConnectionDot = () => {
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