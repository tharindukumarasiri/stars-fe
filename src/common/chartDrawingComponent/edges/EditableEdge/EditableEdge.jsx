import React, { useCallback, useRef } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  useStore,
} from 'reactflow';

import { ControlPoint } from './ControlPoint';
import { getPath, getControlPoints } from './path';
import EdgeMarkers from '../../customElements/EdgeMarkers.js';
import { arrowColor, getId } from '../../utils';
import { Algorithm } from './constants';
import dndStyles from "../../DndStyles.module.scss";

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
  sourceHandleId,
  targetHandleId,
  data = { points: [] },
  ...delegated
}) {

  let delegatedSourceX = sourceX;
  let delegatedSourceY = sourceY;
  let delegatedTargetX = targetX;
  let delegatedTargetY = targetY;

  if (sourceHandleId === 'left') {
    delegatedSourceX = sourceX + 4;
  }
  if (sourceHandleId === 'right') {
    delegatedSourceX = sourceX - 4;
  }
  if (sourceHandleId === 'top') {
    delegatedSourceY = sourceY + 4;
  }
  if (sourceHandleId === 'bottom') {
    delegatedSourceY = sourceY - 4;
  }

  if (targetHandleId === 'left' || targetHandleId === 'left-bottom-center' || targetHandleId === 'left-top-center') {
    delegatedTargetX = targetX + 4;
  }
  if (targetHandleId === 'right' || targetHandleId === 'right-bottom-center' || targetHandleId === 'right-top-center') {
    delegatedTargetX = targetX - 4;
  }
  if (targetHandleId === 'top' || targetHandleId === 'top-left' || targetHandleId === 'top-right' || targetHandleId === 'top-right-center' || targetHandleId === 'top-left-center') {
    delegatedTargetY = targetY + 4;
  }
  if (targetHandleId === 'bottom' || targetHandleId === 'bottom-right-center' || targetHandleId === 'bottom-left-center') {
    delegatedTargetY = targetY - 4;
  }
  if (targetHandleId === 'bottom-left' || targetHandleId === 'bottom-right') {
    delegatedTargetY = targetY - 6;
  }

  const sourceOrigin = { x: delegatedSourceX, y: delegatedSourceY };
  const targetOrigin = { x: delegatedTargetX, y: delegatedTargetY };

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

  const onChangeText = (e) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id !== id) return edge;
        return { ...edge, data: { ...edge.data, label: e.target.value } };
      })
    );
  }

  const onSelectInput = () => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.id !== id) return edge;
        return { ...edge, selected: true };
      })
    );
  }

  const controlPointsWithIds = useIdsForInactiveControlPoints(controlPoints);

  const strokeColor = data?.color ?? arrowColor
  const strokeWidth = data?.width ?? 1
  const centerPointOfEdge = controlPointsWithIds?.[(controlPointsWithIds?.length - 1) / 2]

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
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${centerPointOfEdge?.x}px,${centerPointOfEdge?.y - 16}px)`,
          }}
          className={dndStyles.edgeLabel + " nodrag nopan"}
        >
          {
            selected ? <input
              type="text"
              placeholder='text'
              value={data?.label || ''}
              onChange={onChangeText}
              className={dndStyles.edgeTextArea}
              style={{
                width: Math.min(Math.max(data?.label?.length || 0, 5), 50) + 'ch',
              }}
            /> :
              <div className={dndStyles.edgeTextArea} onClick={onSelectInput}>{data?.label || ''}</div>
          }
        </div>
      </EdgeLabelRenderer>

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
