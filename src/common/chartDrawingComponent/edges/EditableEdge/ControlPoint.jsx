import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useReactFlow, useStore } from 'reactflow';

export function ControlPoint({
  id,
  index,
  x,
  y,
  color,
  active,
  setControlPoints,
}) {
  const container = useStore((store) => store.domNode);
  const { screenToFlowPosition } = useReactFlow();
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);

  // CALLBACKS -----------------------------------------------------------------
  const updatePosition = useCallback(
    (pos) => {
      setControlPoints((points) => {
        const shouldActivate = !active;
        if (shouldActivate) {
          if (index !== 0) {
            return points.flatMap((p, i) =>
              i === index * 0.5 - 1 ? [p, { ...pos, id, active: true }] : p
            );
          } else {
            return [{ ...pos, id, active: true }, ...points];
          }
        } else {
          return points.map((p) => (p.id === id ? { ...p, ...pos } : p));
        }
      });
    },
    [id, active, index, setControlPoints]
  );

  const deletePoint = useCallback(() => {
    setControlPoints((points) => points.filter((p) => p.id !== id));

    // previous active control points are always 2 elements before the current one
    const previousControlPoint =
      ref.current?.previousElementSibling?.previousElementSibling;
    if (
      previousControlPoint?.tagName === 'circle' &&
      previousControlPoint.classList.contains('active')
    ) {
      window.requestAnimationFrame(() => {
        (previousControlPoint).focus();
      });
    }
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      switch (e.key) {
        case 'Enter':
        case 'Space':
          if (!active) {
            e.preventDefault();
          }
          updatePosition({ x, y });
          break;

        case 'Backspace':
        case 'Delete':
          e.stopPropagation();
          deletePoint();
          break;

        case 'ArrowLeft':
          updatePosition({ x: x - 5, y });
          break;

        case 'ArrowRight':
          updatePosition({ x: x + 5, y });
          break;

        case 'ArrowUp':
          updatePosition({ x, y: y - 5 });
          break;

        case 'ArrowDown':
          updatePosition({ x, y: y + 5 });
          break;

        default:
          break;
      }
    },
    [id, x, y, updatePosition, setControlPoints]
  );

  // EFFECTS -------------------------------------------------------------------

  useEffect(() => {
    if (!container || !active || !dragging) return;

    const onPointerMove = (e) => {
      updatePosition(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
    };

    const onPointerUp = (e) => {
      container.removeEventListener('pointermove', onPointerMove);

      if (!active) {
        e.preventDefault();
      }

      setDragging(false);
      updatePosition(screenToFlowPosition({ x: e.clientX, y: e.clientY }));
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp, { once: true });
    container.addEventListener('pointerleave', onPointerUp, { once: true });

    return () => {
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerUp);

      setDragging(false);
    };
  }, [
    id,
    container,
    dragging,
    active,
    screenToFlowPosition,
    setControlPoints,
    updatePosition,
  ]);

  // RENDER --------------------------------------------------------------------

  return (
    <circle
      ref={ref}
      tabIndex={0}
      id={id}
      className={'nopan nodrag' + (active ? ' active' : '')}
      cx={x}
      cy={y}
      r={active ? 2 : 1.5}
      strokeOpacity={active ? 1 : 0.3}
      stroke={color}
      fill={active ? color : 'white'}
      style={{ pointerEvents: 'all' }}
      onContextMenu={(e) => {
        e.preventDefault();
        // delete point by right clicking
        if (active) {
          deletePoint();
        }
      }}
      onPointerDown={(e) => {
        if (e.button === 2) return;
        updatePosition({ x, y });
        setDragging(true);
      }}
      onKeyDown={handleKeyPress}
      onPointerUp={() => setDragging(false)}
    />
  );
}
