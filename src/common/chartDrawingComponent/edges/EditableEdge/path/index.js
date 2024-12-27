import { Position, getSmoothStepPath, getBezierPath } from 'reactflow';

import { getLinearPath, getLinearControlPoints } from './linear';
import { getCatmullRomPath, getCatmullRomControlPoints } from './catmull-rom';
import { Algorithm } from '../constants';

export function getControlPoints(
  points,
  algorithm = Algorithm.BezierCatmullRom,
  sides = { fromSide: Position.Left, toSide: Position.Right }
) {
  switch (algorithm) {
    case Algorithm.Linear:
      return getLinearControlPoints(points);

    case Algorithm.CatmullRom:
      return getCatmullRomControlPoints(points);

    case Algorithm.BezierCatmullRom:
      return getCatmullRomControlPoints(points, true, sides);
  }
}

export function getPath(
  points,
  algorithm = Algorithm.BezierCatmullRom,
  sides = { fromSide: Position.Left, toSide: Position.Right }
) {
  switch (algorithm) {
    case Algorithm.Linear:
      return getLinearPath(points);

    case Algorithm.CatmullRom:
      return getBezierPath({
        sourceX: points[0].x,
        sourceY: points[0].y,
        targetX: points[points.length - 1].x,
        targetY: points[points.length - 1].y,
        sourcePosition: sides.fromSide,
        targetPosition: sides.toSide,
      })[0];

    case Algorithm.BezierCatmullRom:
      return getSmoothStepPath({
        sourceX: points[0].x,
        sourceY: points[0].y,
        targetX: points[points.length - 1].x,
        targetY: points[points.length - 1].y,
        sourcePosition: sides.fromSide,
        targetPosition: sides.toSide,
      })[0];
  }
}
