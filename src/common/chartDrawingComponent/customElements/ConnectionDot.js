import React from "react"
import { Handle, Position, useStore } from 'reactflow';

import style from '../DndStyles.module.scss'

const ConnectionDot = ({ selected, width = 0, height = 0 }) => {
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
            <Handle
                type="source"
                id="top-left"
                position={Position.Top}
                className={style.handle}
                style={{ top: -4, left: 0, backgroundColor: selected ? 'transparent' : 'white', border: selected ? 'none' : '1px solid #c8c8c8' }}
            />
            <Handle
                type="source"
                id="top-right"
                position={Position.Top}

                className={style.handle}
                style={{ top: -4, left: width, backgroundColor: selected ? 'transparent' : 'white', border: selected ? 'none' : '1px solid #c8c8c8' }}
            />
            <Handle
                type="source"
                id="bottom-left"
                position={Position.Bottom}

                className={style.handle}
                style={{ top: height - 4, left: 0, backgroundColor: selected ? 'transparent' : 'white', border: selected ? 'none' : '1px solid #c8c8c8' }}
            />
            <Handle
                type="source"
                id="bottom-right"
                position={Position.Bottom}

                className={style.handle}
                style={{ top: height - 4, left: width, backgroundColor: selected ? 'transparent' : 'white', border: selected ? 'none' : '1px solid #c8c8c8' }}
            />
        </>
    )
}

export default ConnectionDot