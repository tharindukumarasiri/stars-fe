import React, { memo, useState, useCallback, useEffect } from 'react';
import { NodeResizer, useReactFlow } from 'reactflow';

import ConnectionDot from '../customElements/ConnectionDot';
import { useNodeDataStore } from '../store'
import Shapes from '../ShapesData.js';
import { getRgbaColor } from '../utils';

const resizerHandleStyle = { width: 6, height: 6, zIndex: 25 }

function CustomizableShape({ id, selected, type, data }) {
  const { setNodes } = useReactFlow();

  const shapeData = Shapes[type]
  const initialHeight = shapeData?.size?.height ?? 100;
  const initialWidth = shapeData?.size?.width ?? 100;

  const [isShapeEditMode, setIsShapeEditMode] = useState(false);
  const [basePoints] = useState([
    { x: 0, y: 0 },     // top-left
    { x: initialHeight, y: 0 },   // top-right
    { x: initialHeight, y: initialWidth }, // bottom-right
    { x: 0, y: initialWidth }    // bottom-left
  ]);

  const [draggedPointIndex, setDraggedPointIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === id);
  const changeChartData = useNodeDataStore((state) => state.setChartData);
  const onChangeChartData = (value) => changeChartData(id, value)

  const points = chartData?.points || [...basePoints]
  const setPoints = (value) => onChangeChartData({ points: value })

  const sizes = useNodeDataStore((state) => state?.size);
  const onSizeCahnge = useNodeDataStore((state) => state.setSize);

  const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
  const setSize = (value) => onSizeCahnge(id, value)

  const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);

  const rotate = textdata?.rotate || '0'

  const backgroundColor = getRgbaColor(textdata?.backgroundColor) || '#ffffff'
  const borderColor = getRgbaColor(textdata?.borderColor) || 'black'

  const mainContainerStyle = {
    position: "relative",
    height: size?.height,
    width: size?.width,
    transform: `rotate(${rotate}deg)`,
    backgroundColor: shapeData?.hideShape ? backgroundColor : '',
    borderColor: shapeData?.hideShape ? borderColor : '',
  }

  useEffect(() => {
    if (sizes.find(item => item.id === id)) return;

    if (data?.size) {
      setSize(data?.size)
    } else {
      setSize({ height: initialHeight, width: initialWidth })
    }
  }, []);

  // Update dimensions based on points
  const updateDimensions = useCallback(() => {
    const maxX = Math.max(...points.map(p => p.x));
    const maxY = Math.max(...points.map(p => p.y));
    const minX = Math.min(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));

    const padding = 20;
    const newWidth = maxX - minX + padding;
    const newHeight = maxY - minY + padding;

    // Only update if dimensions actually changed
    if (newWidth !== size.width || newHeight !== size.height) {
      setSize({
        width: Math.max(100, newWidth),
        height: Math.max(100, newHeight)
      });

      // Adjust points relative to new minimum
      const adjustedPoints = points.map(point => ({
        x: point.x - minX + padding / 2,
        y: point.y - minY + padding / 2
      }));
      setPoints(adjustedPoints);
      // Update base points as well
      adjustedPoints.forEach((point, index) => {
        basePoints[index] = { ...point };
      });
    }
  }, [points, size.width, size.height, basePoints]);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsShapeEditMode(!isShapeEditMode);
    setNodes((nodes) =>
      nodes.map((node) =>
        (node.id === id ? { ...node, draggable: isShapeEditMode } : node))
    );

  };

  const handleMouseDown = (index) => (e) => {
    if (!isShapeEditMode) return;
    e.stopPropagation();

    const container = e.currentTarget.closest('div');
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDragOffset({
      x: x - points[index].x,
      y: y - points[index].y
    });

    setDraggedPointIndex(index);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    if (draggedPointIndex === null) return;
    e.stopPropagation();
    e.preventDefault();

    const container = document.querySelector(`[data-id="${id}"]`);
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    const newPoints = points.map((point, index) =>
      index === draggedPointIndex ? { x, y } : point
    );

    setPoints(newPoints);
    updateDimensions();
  }, [draggedPointIndex, dragOffset, points, updateDimensions, id]);

  const handleMouseUp = useCallback((e) => {
    e.stopPropagation();
    if (draggedPointIndex !== null) {
      setDraggedPointIndex(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [draggedPointIndex, handleMouseMove]);

  useEffect(() => {
    if (draggedPointIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedPointIndex, handleMouseMove, handleMouseUp]);


  const onResize = useCallback((_, { width, height }) => {
    const scaleX = width / size.width;
    const scaleY = height / size.height;

    const newPoints = points.map(point => ({
      x: point.x * scaleX,
      y: point.y * scaleY
    }));

    setPoints(newPoints);
    setSize({ width, height })

    // Update base points for future scaling
    newPoints.forEach((point, index) => {
      basePoints[index] = { ...point };
    });
  }, [size.width, size.height, points, basePoints]);

  const pathData = `M ${points[0].x},${points[0].y} 
  L ${points[1].x},${points[1].y} 
  L ${points[2].x},${points[2].y} 
  L ${points[3].x},${points[3].y} Z`;

  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={initialWidth * 0.5}
        minHeight={initialHeight * 0.5}
        onResize={onResize}
        keepAspectRatio={shapeData?.keepAspectRatio ?? true}
        handleStyle={resizerHandleStyle}
      />

      <div
        onDoubleClick={handleDoubleClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={mainContainerStyle}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0
          }}
          fill={backgroundColor}
          strokeWidth="5"
        >
          <path
            d={pathData}
            fill={backgroundColor}
            stroke={isShapeEditMode ? "#ff0000" : borderColor}
            strokeWidth="2"
          />

          {isShapeEditMode && points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#ff0000"
              stroke="#fff"
              strokeWidth="1"
              style={{ cursor: 'move' }}
              onMouseDown={handleMouseDown(index)}
            />
          ))}
        </svg>
      </div>

      <ConnectionDot selected={selected} width={size?.width} height={size?.height} />

    </>
  );
}

export default memo(CustomizableShape);