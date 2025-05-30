import React, { useCallback } from 'react';
import { useStore, getStraightPath } from 'reactflow';

import { getEdgeParams } from '../utils.js';
import EdgeMarkers from './EdgeMarkers.js';

function FloatingEdge({ id, source, target, markerEnd, markerStart, selected, style }) {
    const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
    const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });

    return (
        <>
            <EdgeMarkers />
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                markerStart={markerStart}
                style={{ ...style, ...{ stroke: selected ? 'blue' : '' } }}
            />
        </>

    );
}

export default FloatingEdge;
