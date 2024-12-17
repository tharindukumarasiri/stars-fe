import { isControlPoint } from './utils';
import { getId } from '../../../utils';

export function getLinearPath(points) {
  if (points.length < 1) return '';

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }

  return path;
}

export function getLinearControlPoints(
  points
) {
  const controlPoints = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (isControlPoint(p1)) {
      controlPoints.push(p1);
    }

    controlPoints.push({
      prev: 'id' in p1 ? p1.id : undefined,
      id: `spline-${getId('point') + Math.random().toString()}`,
      active: false,
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    });
  }

  return controlPoints;
}
