import { Position, MarkerType } from 'reactflow';

//Constants
export const arrowColor = '#8f8f8f'

export const presetColors = ['rgba(255, 255, 255, 0)', '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']

export const fontTypes = [
    {
        label: 'Arial',
        type: 'Arial'
    },
    {
        label: 'Sans serif',
        type: 'sans-serif'
    },
    {
        label: 'Poppins',
        type: 'Poppins'
    },
    {
        label: 'Times New Roman',
        type: 'Times New Roman'
    },
]

export const markerTypes = [
    { label: 'None' },
    {
        label: 'Send',
        icon: 'icon-email'
    },
    {
        label: 'Recieve',
        icon: 'icon-email-circle-solid'
    },
    {
        label: 'Time',
        icon: 'icon-hourly'

    },
    {
        label: 'Share',
        icon: 'icon-p2p'
    },
]

export const arrowStartTypes = [
    { label: 'None' },
    {
        label: 'Arrow closed',
        icon: 'icon-point-arrow-right',
        markerId: 'arrowclosed'
    },
    {
        label: 'Arrow',
        icon: 'icon-circle-arrow-r2',
        markerId: 'arrow'
    },
    {
        label: 'Relation',
        icon: 'icon-minus-1',
        markerId: 'linestart'
    },
    {
        label: 'Circle',
        icon: 'icon-inst-circle-solid',
        markerId: 'circlestart'
    },
]

export const arrowEndTypes = [
    {
        label: 'Arrow closed',
        icon: 'icon-point-arrow-right',
        markerId: 'arrowclosed'
    },
    {
        label: 'Arrow',
        icon: 'icon-circle-arrow-r2',
        markerId: 'arrow'
    },
    {
        label: 'Relation',
        icon: 'icon-minus-1',
        markerId: 'lineend'
    },
    {
        label: 'Circle',
        icon: 'icon-inst-circle-solid',
        markerId: 'circleend'
    },
]

export const downloadTypes = [
    {
        label: 'JPG',
        type: 'JPG'
    },
    {
        label: 'Png',
        type: 'PNG'
    },
    {
        label: 'JSON',
        type: 'JSON'
    },
]

export const colorPickerTypes = {
    TEXT: 'TEXT',
    BACKGROUND: 'BACKGROUND',
    LINE: 'LINE',
    SECTION_BG: 'SECTION_BG',
    SECTION_BORDER: 'SECTION_BORDER',
    HEADER_BORDER: 'HEADER_BORDER',
}

export const getId = (type) => `${type}_${+new Date()}`;

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
function getNodeIntersection(intersectionNode, targetNode) {
    // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
    const {
        width: intersectionNodeWidth,
        height: intersectionNodeHeight,
        positionAbsolute: intersectionNodePosition,
    } = intersectionNode;
    const targetPosition = targetNode.positionAbsolute;

    const w = intersectionNodeWidth / 2;
    const h = intersectionNodeHeight / 2;

    const x2 = intersectionNodePosition.x + w;
    const y2 = intersectionNodePosition.y + h;
    const x1 = targetPosition.x + w;
    const y1 = targetPosition.y + h;

    const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
    const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
    const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
    const xx3 = a * xx1;
    const yy3 = a * yy1;
    const x = w * (xx3 + yy3) + x2;
    const y = h * (-xx3 + yy3) + y2;

    return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
function getEdgePosition(node, intersectionPoint) {
    const n = { ...node.positionAbsolute, ...node };
    const nx = Math.round(n.x);
    const ny = Math.round(n.y);
    const px = Math.round(intersectionPoint.x);
    const py = Math.round(intersectionPoint.y);

    if (px <= nx + 1) {
        return Position.Left;
    }
    if (px >= nx + n.width - 1) {
        return Position.Right;
    }
    if (py <= ny + 1) {
        return Position.Top;
    }
    if (py >= n.y + n.height - 1) {
        return Position.Bottom;
    }

    return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) you need to create an edge
export function getEdgeParams(source, target) {
    const sourceIntersectionPoint = getNodeIntersection(source, target);
    const targetIntersectionPoint = getNodeIntersection(target, source);

    const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
    const targetPos = getEdgePosition(target, targetIntersectionPoint);

    return {
        sx: sourceIntersectionPoint.x,
        sy: sourceIntersectionPoint.y,
        tx: targetIntersectionPoint.x,
        ty: targetIntersectionPoint.y,
        sourcePos,
        targetPos,
    };
}

export function createNodesAndEdges() {
    const nodes = [];
    const edges = [];
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    nodes.push({ id: 'target', data: { label: 'Target' }, position: center });

    for (let i = 0; i < 8; i++) {
        const degrees = i * (360 / 8);
        const radians = degrees * (Math.PI / 180);
        const x = 250 * Math.cos(radians) + center.x;
        const y = 250 * Math.sin(radians) + center.y;

        nodes.push({ id: `${i}`, data: { label: 'Source' }, position: { x, y } });

        edges.push({
            id: `edge-${i}`,
            target: 'target',
            source: `${i}`,
            type: 'floating',
            markerEnd: {
                type: MarkerType.Arrow,
            },
        });
    }

    return { nodes, edges };
}

export const getRgbaColor = (color) => {
    if (!color?.r || !color?.g || !color?.b)
        return color
    return `rgb(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a})`
}

export const getGradientRgbaColor = (color) => {
    if (!'r' in color || !'g' in color || !'b' in color)
        return color
    return `linear-gradient(90deg, rgb(${color?.r}, ${color?.g}, ${color?.b}, ${color?.a}), rgb(255,255,255,1))`
}

const componentToHex = (c) => {
    var hex = c?.toString(16);
    return hex?.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (color) => {
    if (!color?.hasOwnProperty('r'))
        return String(color)
    return "#" + componentToHex(color?.r) + componentToHex(color?.g) + componentToHex(color?.b);
}

export const downloadImage = (dataUrl, type = 'png') => {
    const a = document.createElement('a');

    a.setAttribute('download', `reactflow.${type}`);
    a.setAttribute('href', dataUrl);
    a.click();
}

export const downloadJson = (data) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
};

export const readFile = (file, asText = false) => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        if (asText) {
            reader.readAsText(file)
        } else {
            reader.readAsDataURL(file)
        }
    })
}

export const getImageDimensions = (file) => {
    return new Promise(function (resolved, rejected) {
        var i = new Image()
        i.onload = function () {
            resolved({ w: i.width, h: i.height })
        };
        i.src = file
    })
}

export function getHelperLines(
    change,
    nodes,
    distance = 5
) {
    const defaultResult = {
        horizontal: undefined,
        vertical: undefined,
        snapPosition: { x: undefined, y: undefined },
    };
    const nodeA = nodes.find((node) => node.id === change.id);

    if (!nodeA || !change.position) {
        return defaultResult;
    }

    const nodeABounds = {
        left: change.position.x,
        right: change.position.x + (nodeA.measured?.width ?? 0),
        top: change.position.y,
        bottom: change.position.y + (nodeA.measured?.height ?? 0),
        width: nodeA.measured?.width ?? 0,
        height: nodeA.measured?.height ?? 0,
    };

    let horizontalDistance = distance;
    let verticalDistance = distance;

    return nodes
        .filter((node) => node.id !== nodeA.id)
        .reduce((result, nodeB) => {
            const nodeBBounds = {
                left: nodeB.position.x,
                right: nodeB.position.x + (nodeB.measured?.width ?? 0),
                top: nodeB.position.y,
                bottom: nodeB.position.y + (nodeB.measured?.height ?? 0),
                width: nodeB.measured?.width ?? 0,
                height: nodeB.measured?.height ?? 0,
            };

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //  |
            //  |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceLeftLeft = Math.abs(nodeABounds.left - nodeBBounds.left);

            if (distanceLeftLeft < verticalDistance) {
                result.snapPosition.x = nodeBBounds.left;
                result.vertical = nodeBBounds.left;
                verticalDistance = distanceLeftLeft;
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //              |
            //              |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceRightRight = Math.abs(
                nodeABounds.right - nodeBBounds.right
            );

            if (distanceRightRight < verticalDistance) {
                result.snapPosition.x = nodeBBounds.right - nodeABounds.width;
                result.vertical = nodeBBounds.right;
                verticalDistance = distanceRightRight;
            }

            //              |‾‾‾‾‾‾‾‾‾‾‾|
            //              |     A     |
            //              |___________|
            //              |
            //              |
            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     B     |
            //  |___________|
            const distanceLeftRight = Math.abs(nodeABounds.left - nodeBBounds.right);

            if (distanceLeftRight < verticalDistance) {
                result.snapPosition.x = nodeBBounds.right;
                result.vertical = nodeBBounds.right;
                verticalDistance = distanceLeftRight;
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|
            //              |
            //              |
            //              |‾‾‾‾‾‾‾‾‾‾‾|
            //              |     B     |
            //              |___________|
            const distanceRightLeft = Math.abs(nodeABounds.right - nodeBBounds.left);

            if (distanceRightLeft < verticalDistance) {
                result.snapPosition.x = nodeBBounds.left - nodeABounds.width;
                result.vertical = nodeBBounds.left;
                verticalDistance = distanceRightLeft;
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |     |     B     |
            //  |___________|     |___________|
            const distanceTopTop = Math.abs(nodeABounds.top - nodeBBounds.top);

            if (distanceTopTop < horizontalDistance) {
                result.snapPosition.y = nodeBBounds.top;
                result.horizontal = nodeBBounds.top;
                horizontalDistance = distanceTopTop;
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |
            //  |___________|_________________
            //                    |           |
            //                    |     B     |
            //                    |___________|
            const distanceBottomTop = Math.abs(nodeABounds.bottom - nodeBBounds.top);

            if (distanceBottomTop < horizontalDistance) {
                result.snapPosition.y = nodeBBounds.top - nodeABounds.height;
                result.horizontal = nodeBBounds.top;
                horizontalDistance = distanceBottomTop;
            }

            //  |‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾|
            //  |     A     |     |     B     |
            //  |___________|_____|___________|
            const distanceBottomBottom = Math.abs(
                nodeABounds.bottom - nodeBBounds.bottom
            );

            if (distanceBottomBottom < horizontalDistance) {
                result.snapPosition.y = nodeBBounds.bottom - nodeABounds.height;
                result.horizontal = nodeBBounds.bottom;
                horizontalDistance = distanceBottomBottom;
            }

            //                    |‾‾‾‾‾‾‾‾‾‾‾|
            //                    |     B     |
            //                    |           |
            //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
            //  |     A     |
            //  |___________|
            const distanceTopBottom = Math.abs(nodeABounds.top - nodeBBounds.bottom);

            if (distanceTopBottom < horizontalDistance) {
                result.snapPosition.y = nodeBBounds.bottom;
                result.horizontal = nodeBBounds.bottom;
                horizontalDistance = distanceTopBottom;
            }

            return result;
        }, defaultResult);
}