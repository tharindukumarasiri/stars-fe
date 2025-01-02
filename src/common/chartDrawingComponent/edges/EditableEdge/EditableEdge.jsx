import React, { useCallback, useRef } from 'react';
import {
  BaseEdge,
  useReactFlow,
  useStore,
} from 'reactflow';

import { ControlPoint } from './ControlPoint';
import { getPath, getControlPoints } from './path';
import EdgeMarkers from '../../customElements/EdgeMarkers.js';
import { arrowColor, getId } from '../../utils';
import { Algorithm } from './constants';

const useIdsForInactiveControlPoints = (points) => {
  const ids = useRef([])

  if (ids.current.length === points.length) {
    return points.map((point, i) => point.id ? point : (
      { ...point, id: ids.current[i] }))
  } else {
    ids.current = []

    return points.map((point, i) => {
      if (!point.id) {
        const id = getId('point') + Math.random().toString()
        ids.current[i] = id
        return { ...point, id: id }
      } else {
        ids.current[i] = point.id
        return point
      }
    })
  }
};

export function EditableEdgeComponent({
  id,
  selected,
  source,
  sourceX,
  sourceY,
  sourcePosition,
  target,
  targetX,
  targetY,
  targetPosition,
  markerEnd,
  markerStart,
  style,
  data = { points: [] },

  ...delegated
}) {
  const sourceOrigin = { x: sourceX, y: sourceY };
  const targetOrigin = { x: targetX, y: targetY };

  const { setEdges } = useReactFlow();
  const shouldShowPoints = useStore((store) => {
    const sourceNode = store.nodeInternals.get(source);
    const targetNode = store.nodeInternals.get(target);

    return (selected || sourceNode.selected || targetNode.selected) && data.algorithm === Algorithm.Linear;
  });

  const setControlPoints = useCallback(
    (update) => {
      setEdges((edges) =>
        edges.map((e) => {
          if (e.id !== id) return e;
          if (!isEditableEdge(e)) return e;

          const points = e.data?.points ?? [];
          const data = { ...e.data, points: update(points) };

          return { ...e, data };
        })
      );
    },
    [id, setEdges]
  );

  const pathPoints = [sourceOrigin, ...data.points, targetOrigin];
  const controlPoints = getControlPoints(pathPoints, data.algorithm, {
    fromSide: sourcePosition,
    toSide: targetPosition,
  });
  const path = getPath(pathPoints, data.algorithm, {
    fromSide: sourcePosition,
    toSide: targetPosition,
  });

  const controlPointsWithIds = useIdsForInactiveControlPoints(controlPoints);

  const strokeColor = data?.color ?? arrowColor
  const strokeWidth = data?.width ?? 2

  return (
    <>
      <EdgeMarkers color={strokeColor} />
      <BaseEdge
        id={id}
        path={path}
        {...delegated}
        markerStart={markerStart}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: strokeWidth,
          stroke: strokeColor,
          strokeDasharray: selected ? `${strokeWidth} ${strokeWidth}` : "", // Dashed pattern: 5px line, 5px gap
          animation: "dash-animation 0.5s linear infinite", // Reference to the animation
        }}
      />

      {shouldShowPoints &&
        controlPointsWithIds.map((point, index) => (
          <ControlPoint
            key={point.id}
            index={index}
            setControlPoints={setControlPoints}
            color={strokeColor}
            {...point}
          />
        ))}
    </>
  );
}

const isEditableEdge = (edge) =>
  edge.type === 'editable-edge';
