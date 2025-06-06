import React from "react"
import { Handle, Position, useStore } from 'reactflow';

import style from '../DndStyles.module.scss'

const hiddenStyle = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    border: 'none'
}

const ConnectionDot = ({ selected, width = 0, height = 0 }) => {
    const connectionNodeIdSelector = (state) => state.connectionNodeId;

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;

    return (
        <>
            <Handle
                type="source"
                position={Position.Top}
                id="top"
                style={!(selected || isConnecting) ? hiddenStyle : {}}
                className={style.handle}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="left"
                style={!(selected || isConnecting) ? hiddenStyle : {}}
                className={style.handle}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom"
                style={!(selected || isConnecting) ? hiddenStyle : {}}
                className={style.handle}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                style={!(selected || isConnecting) ? hiddenStyle : {}}
                className={style.handle}
            />

            <Handle
                type="source"
                id="top-left"
                position={Position.Top}
                className={style.handle}
                style={{
                    top: -4,
                    left: 0,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="top-left-center"
                position={Position.Top}
                className={style.handle}
                style={{
                    top: -4,
                    left: width / 4,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="top-right"
                position={Position.Top}
                className={style.handle}
                style={{
                    top: -4,
                    left: width,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="top-right-center"
                position={Position.Top}
                className={style.handle}
                style={{
                    top: -4,
                    left: width - (width / 4),
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />

            <Handle
                type="source"
                id="bottom-left"
                position={Position.Bottom}
                className={style.handle}
                style={{
                    top: height - 4,
                    left: 0,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="bottom-left-center"
                position={Position.Bottom}
                className={style.handle}
                style={{
                    top: height - 4,
                    left: width / 4,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="bottom-right"
                position={Position.Bottom}
                className={style.handle}
                style={{
                    top: height - 4,
                    left: width,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="bottom-right-center"
                position={Position.Bottom}
                className={style.handle}
                style={{
                    top: height - 4,
                    left: width - (width / 4),
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />

            <Handle
                type="source"
                id="left-top-center"
                position={Position.Left}
                className={style.handle}
                style={{
                    top: height / 4,
                    left: -4,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="left-bottom-center"
                position={Position.Left}
                className={style.handle}
                style={{
                    top: height - (height / 4),
                    left: -4,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />

            <Handle
                type="source"
                id="right-top-center"
                position={Position.Right}
                className={style.handle}
                style={{
                    top: height / 4,
                    left: width - 4,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />
            <Handle
                type="source"
                id="right-bottom-center"
                position={Position.Right}
                className={style.handle}
                style={{
                    top: height - (height / 4),
                    left: width - 4,
                    backgroundColor: selected ? 'transparent' : 'white',
                    border: selected ? 'none' : '1px solid #c8c8c8',
                    ...(!(selected || isConnecting) ? hiddenStyle : {})
                }}
            />

        </>
    )
}

export default ConnectionDot